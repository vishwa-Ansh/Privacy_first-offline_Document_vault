import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { formatFileSize } from './vaultReader';

const COLORS = {
  navy: '#12172B',
  gold: '#C9A24B',
  bg: '#F6F7FB',
  card: '#FFFFFF',
  textPrimary: '#12172B',
  textMuted: '#9AA1AC',
  border: '#EEF0F4',
};

// category: { title, icon, count, files: [{name, uri, size, lastModified, icon, label}] }
// onOpenFile(file): optional, called when user taps a file (e.g. to preview/open it)
// onBack(): called when the back button is tapped
export default function DocumentListScreen({ category, onOpenFile, onBack }) {
  if (!category) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerIconWrap}>
          <Text style={styles.headerIcon}>{category.icon}</Text>
        </View>
        <Text style={styles.headerTitle}>{category.title}</Text>
        <Text style={styles.headerSubtitle}>
          {category.count} {category.count === 1 ? 'document' : 'documents'}
        </Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {category.files.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No files found in this folder yet.</Text>
          </View>
        ) : (
          category.files.map((file, idx) => (
            <TouchableOpacity
              key={file.uri || idx}
              style={styles.fileRow}
              activeOpacity={0.8}
              onPress={() => onOpenFile && onOpenFile(file)}
            >
              <View style={styles.fileIconWrap}>
                <Text style={styles.fileIcon}>{file.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fileLabel} numberOfLines={1}>
                  {file.label || file.name}
                </Text>
                <Text style={styles.fileMeta} numberOfLines={1}>
                  {file.name} • {formatFileSize(file.size)}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: '#12172B',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.05,
  shadowRadius: 12,
  elevation: 2,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.navy,
    paddingTop: 20,
    paddingBottom: 26,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backIcon: { color: '#fff', fontSize: 18 },
  headerIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: 'rgba(201,162,75,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,75,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  headerIcon: { fontSize: 22 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 12.5, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  body: { flex: 1, paddingHorizontal: 20, marginTop: 16 },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    ...shadow,
  },
  fileIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fileIcon: { fontSize: 19 },
  fileLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  fileMeta: { fontSize: 11.5, color: COLORS.textMuted, marginTop: 3 },
  chevron: { fontSize: 20, color: COLORS.textMuted, marginLeft: 6 },
  emptyWrap: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 13, color: COLORS.textMuted },
});
