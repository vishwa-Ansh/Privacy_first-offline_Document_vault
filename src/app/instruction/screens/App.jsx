import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import DocumentListScreen from './DocumentListScreen';
import FolderPickerScreen from './FolderPickerScreen';
import HomeScreenPremium from './HomeScreenPremium';
import { getRecentFiles, getSavedRootUri, hasVaultPermission, scanVaultFolder } from './vaultReader';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [connected, setConnected] = useState(false);
  const [categories, setCategories] = useState([]); // one entry per sub-folder the user made
  const [recentFiles, setRecentFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // opens DocumentListScreen when set

  useEffect(() => {
    boot();
  }, []);

  const boot = async () => {
    const savedUri = await getSavedRootUri();
    if (savedUri) {
      const stillValid = await hasVaultPermission();
      if (stillValid) {
        await refreshData();
        setConnected(true);
      } else {
        // Permission was revoked (e.g. from Android Settings) — ask again.
        setConnected(false);
      }
    }
    setBooting(false);
  };

  const refreshData = useCallback(async () => {
    const scanned = await scanVaultFolder();
    setCategories(scanned);
    setRecentFiles(getRecentFiles(scanned, 5));
  }, []);

  const handleFolderConnected = async (scanned) => {
    setCategories(scanned);
    setRecentFiles(getRecentFiles(scanned, 5));
    setConnected(true);
  };

  if (booting) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#12172B" />
      </View>
    );
  }

  if (!connected) {
    return <FolderPickerScreen onDone={handleFolderConnected} />;
  }

  if (selectedCategory) {
    return (
      <DocumentListScreen
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
        onOpenFile={(file) => {
          // Hook up a viewer here, e.g. react-native-file-viewer:
          //   FileViewer.open(file.uri)
          console.log('Open file:', file.uri);
        }}
      />
    );
  }

  return (
    <HomeScreenPremium
      folders={categories}
      recentFiles={recentFiles}
      onRefresh={refreshData}
      onOpenFolder={(folder) => setSelectedCategory(folder)}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F7FB' },
});
