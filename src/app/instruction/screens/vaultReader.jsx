import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  hasPermission,
  listFiles,
  openDocumentTree,
  releasePersistableUriPermission,
} from 'react-native-saf-x';

/**
 * ── WHAT THIS FILE DOES ─────────────────────────────────────────────────
 * The user creates their OWN folder + sub-folders on their phone (in any
 * file manager) and drops files into them, e.g.:
 *
 *   MyDocuments/
 *     Identity/        → Aadhaar.jpg, PAN.pdf, Passport.pdf
 *     Banking/         → Passbook.pdf
 *     Education/       → Marksheet_10th.pdf
 *
 * The app does NOT create this structure — it only asks the user, once,
 * to point at the folder they already made (via the system folder picker),
 * then reads whatever sub-folders and files are inside, however many
 * levels or whatever names they used, and displays them.
 *
 * ── WHY SAF ─────────────────────────────────────────────────────────────
 * Storage Access Framework is the only way for a normal (non "All files
 * access") app to read a folder anywhere in shared/public storage on
 * Android 11+, and it also works fine on Android 5–10. So this single
 * approach covers every Android version you listed, including 12+.
 *
 * ── SETUP ────────────────────────────────────────────────────────────────
 * npm install react-native-saf-x @react-native-async-storage/async-storage
 * (no manifest permissions needed — the folder picker itself grants access)
 */

const ROOT_URI_KEY = '@vault_root_uri_v2';

/* ---------------- Document type detection (for nice icons/labels) ---------------- */

const KEYWORD_MAP = [
  { match: /aadha?ar/i, icon: '🪪', label: 'Aadhaar Card' },
  { match: /\bpan\b/i, icon: '💳', label: 'PAN Card' },
  { match: /passport/i, icon: '📘', label: 'Passport' },
  { match: /(licen[cs]e|\bdl\b)/i, icon: '🚘', label: 'Driving License' },
  { match: /voter/i, icon: '🗳️', label: 'Voter ID' },
  { match: /(marksheet|result|\bmarks\b)/i, icon: '📊', label: 'Marksheet / Result' },
  { match: /(certificate|certi\b|degree)/i, icon: '🎓', label: 'Certificate' },
  { match: /(passbook|bank|statement|cheque)/i, icon: '🏦', label: 'Bank Document' },
  { match: /insurance/i, icon: '🛡️', label: 'Insurance' },
  { match: /(\brc\b|registration)/i, icon: '🚗', label: 'Vehicle RC' },
  { match: /(rent|agreement|property|registry)/i, icon: '🏠', label: 'Property Document' },
  { match: /(vaccin|medical|health|abha)/i, icon: '⚕️', label: 'Health Document' },
];

const EXT_ICON_MAP = {
  pdf: '📄',
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
  webp: '🖼️',
  doc: '📝',
  docx: '📝',
  xls: '📊',
  xlsx: '📊',
};

/** Guess a friendly icon + label for a file based on its name / extension. */
export function detectDocType(fileName) {
  for (const entry of KEYWORD_MAP) {
    if (entry.match.test(fileName)) return { icon: entry.icon, label: entry.label };
  }
  const ext = (fileName.split('.').pop() || '').toLowerCase();
  return { icon: EXT_ICON_MAP[ext] || '📁', label: null };
}

const FOLDER_ICON_MAP = [
  { match: /identity/i, icon: '🪪' },
  { match: /bank/i, icon: '🏦' },
  { match: /educat/i, icon: '🎓' },
  { match: /govern/i, icon: '🏛️' },
  { match: /(health|medical)/i, icon: '⚕️' },
  { match: /(vehicle|car|bike)/i, icon: '🚗' },
  { match: /propert/i, icon: '🏠' },
  { match: /photo/i, icon: '🖼️' },
];

/** Guess an icon for a sub-folder based on its name. Falls back to a plain folder icon. */
export function detectFolderIcon(folderName) {
  for (const entry of FOLDER_ICON_MAP) {
    if (entry.match.test(folderName)) return entry.icon;
  }
  return '📁';
}

/* ---------------- Picking & permission ---------------- */

/** Opens the system folder picker so the user can select the folder they already created. */
export async function pickExistingVaultFolder() {
  const doc = await openDocumentTree(true); // true = keep permission after app restarts/reboots
  if (!doc || !doc.uri) return null;
  await AsyncStorage.setItem(ROOT_URI_KEY, doc.uri);
  return doc.uri;
}

export async function getSavedRootUri() {
  return AsyncStorage.getItem(ROOT_URI_KEY);
}

/** Checks we still have read access — the user could have revoked it from Settings. */
export async function hasVaultPermission() {
  const uri = await getSavedRootUri();
  if (!uri) return false;
  try {
    return await hasPermission(uri);
  } catch {
    return false;
  }
}

/** Lets the user point the app at a different folder later (e.g. from Settings). */
export async function resetVaultFolder() {
  const uri = await getSavedRootUri();
  if (uri) {
    try {
      await releasePersistableUriPermission(uri);
    } catch {
      // permission may already be gone — safe to ignore
    }
  }
  await AsyncStorage.removeItem(ROOT_URI_KEY);
}

/* ---------------- Scanning the user's own folder structure ---------------- */

/**
 * Scans the folder the user picked. Every sub-folder found becomes a
 * category card in the app; any loose files sitting directly in the root
 * are grouped under an "Others" category so nothing is missed.
 *
 * Returns: [{ id, title, icon, count, files: [{name, uri, size, lastModified, icon, label}] }]
 */
export async function scanVaultFolder() {
  const rootUri = await getSavedRootUri();
  if (!rootUri) return [];

  const rootItems = (await listFiles(rootUri)) || [];
  const subFolders = rootItems.filter((i) => i.isDirectory);
  const rootFiles = rootItems.filter((i) => !i.isDirectory);

  const categories = [];
  
  console.log(rootItems)

  for (const folder of subFolders) {
    try {
      const items = (await listFiles(folder.uri)) || [];
      const files = items
        .filter((i) => !i.isDirectory)
        .map((i) => ({
          name: i.name,
          uri: i.uri,
          size: i.size,
          lastModified: i.lastModified,
          ...detectDocType(i.name),
        }));
      categories.push({
        id: folder.uri,
        title: folder.name,
        icon: detectFolderIcon(folder.name),
        count: files.length,
        files,
      });
    } catch (err) {
      console.error(`Could not read folder "${folder.name}":`, err);
    }
  }

  if (rootFiles.length) {
    categories.push({
      id: `${rootUri}__others`,
      title: 'Others',
      icon: '📁',
      count: rootFiles.length,
      files: rootFiles.map((i) => ({
        name: i.name,
        uri: i.uri,
        size: i.size,
        lastModified: i.lastModified,
        ...detectDocType(i.name),
      })),
    });
  }

  return categories;
}

/** Flattens every category's files into one "recent" list, newest first. */
export function getRecentFiles(categories, limit = 5) {
  const all = [];
  for (const cat of categories) {
    for (const file of cat.files) all.push({ ...file, folderTitle: cat.title });
  }
  return all
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    .slice(0, limit);
}

/** Human-readable file size, e.g. "2.4 MB". */
export function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
