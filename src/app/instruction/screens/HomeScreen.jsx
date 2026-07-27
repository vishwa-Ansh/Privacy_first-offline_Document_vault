import { Stack } from 'expo-router';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Replace these with your real asset imports or remote URLs
const placeholder = 'https://placehold.co/300x200/png';

const QUICK_ACCESS = [
  { id: '1', title: 'Aadhaar Card', img: 'https://images.moneycontrol.com/static-mcnews/2025/04/20250404112835_Aadhaar-card-generated-using-AI-690x435.png ' },
  { id: '2', title: 'PAN Card', img: 'https://www.pancardapp.com/blog/wp-content/uploads/2019/04/sample-pan-card.jpg' },
  { id: '3', title: 'Passport', img: placeholder },
  { id: '4', title: 'Driving License', img: placeholder },
  { id: '5', title: 'Voter ID', img: placeholder },
];

const FOLDERS = [
  { id: '1', title: 'Identity', count: 5, color: '#DCEBFF', icon: '📁' },
  { id: '2', title: 'Banking', count: 8, color: '#DFF5E3', icon: '🏦' },
  { id: '3', title: 'Education', count: 6, color: '#E9E1FB', icon: '🎓' },
  { id: '4', title: 'Government', count: 7, color: '#FDE6D8', icon: '🏛️' },
  { id: '5', title: 'Health', count: 4, color: '#FCE1E7', icon: '❤️' },
  { id: '6', title: 'Vehicle', count: 4, color: '#DBF3F1', icon: '🚗' },
];

const RECENT_DOCS = [
  { id: '1', name: 'Aadhaar Card.jpg', folder: 'Identity', date: 'Today, 09:30 AM' },
  { id: '2', name: 'SBI Passbook.pdf', folder: 'Banking', date: 'Yesterday, 06:15 PM' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{
        headerTransparent:true,
        headerTitle:'',
        headerShown:false
      }}/>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hello, User 👋</Text>
          <Text style={styles.subGreeting}>All your important documents, secure & offline.</Text>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search documents, folders..."
              placeholderTextColor="#9AA0A6"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.iconText}>▽</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickAccessRow}
        >
          {QUICK_ACCESS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.quickCard}>
              <View>
                <Image
                  source={{ uri: String(item.img).trim() }}
                  style={styles.quickImage}
                  resizeMode="cover"
                />
                <View style={styles.starBadge}>
                  <Text style={styles.starText}>★</Text>
                </View>
              </View>
              <Text style={styles.quickTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* My Folders */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Folders</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Grid ⊞</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foldersGrid}>
          {FOLDERS.map((folder) => (
            <TouchableOpacity
              key={folder.id}
              style={styles.folderCard}
              activeOpacity={0.8}
            >
              <View style={[styles.folderIconWrap, { backgroundColor: folder.color }]}>
                <Text style={styles.folderIcon}>{folder.icon}</Text>
              </View>
              <Text style={styles.folderTitle}>{folder.title}</Text>
              <Text style={styles.folderCount}>{folder.count} Documents</Text>
              <View style={styles.folderThumbsRow}>
                <View style={styles.thumbSmall} />
                <View style={styles.thumbSmall} />
                <View style={styles.thumbSmall} />
                <View style={styles.thumbMore}>
                  <Text style={styles.thumbMoreText}>+{folder.count - 3}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Documents */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Documents</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentList}>
          {RECENT_DOCS.map((doc) => (
            <View key={doc.id} style={styles.recentItem}>
              <View style={styles.recentThumb} />
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{doc.name}</Text>
                <Text style={styles.recentFolder}>📁 {doc.folder}</Text>
              </View>
              <View style={styles.recentRight}>
                <Text style={styles.recentDate}>{doc.date}</Text>
                <Text style={styles.moreDots}>⋮</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <NavItem icon="🏠" label="Home" active />
        <NavItem icon="🔍" label="Search" />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <NavItem icon="⭐" label="Favorites" />
        <NavItem icon="⚙️" label="Settings" />
      </View>
    </SafeAreaView>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Text style={[styles.navIcon, active && styles.navIconActive]}>{icon}</Text>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F5FA' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  topBarRight: { flexDirection: 'row', gap: 12 },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  iconText: { fontSize: 18 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#2F6BFF',
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  greetingSection: { paddingHorizontal: 20, marginTop: 16 },
  greeting: { fontSize: 28, fontWeight: '800', color: '#1A1C1E' },
  subGreeting: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  searchIcon: { marginRight: 8, fontSize: 16 },
  searchInput: { flex: 1, fontSize: 15, color: '#1A1C1E' },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1C1E' },
  viewAll: { fontSize: 14, color: '#2F6BFF', fontWeight: '600' },
  quickAccessRow: { paddingLeft: 20, paddingRight: 8 },
  quickCard: { width: 130, marginRight: 12 },
  quickImage: {
    width: 130,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#E3E7EE',
  },
  starBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#2F6BFF',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starText: { color: '#fff', fontSize: 11 },
  quickTitle: { marginTop: 8, fontSize: 13, fontWeight: '600', color: '#1A1C1E' },
  foldersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  folderCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  folderIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  folderIcon: { fontSize: 20 },
  folderTitle: { fontSize: 15, fontWeight: '700', color: '#1A1C1E' },
  folderCount: { fontSize: 12, color: '#8B8F97', marginTop: 2, marginBottom: 10 },
  folderThumbsRow: { flexDirection: 'row', gap: 6 },
  thumbSmall: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#E3E7EE',
  },
  thumbMore: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#EDEFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbMoreText: { fontSize: 10, color: '#6B7280', fontWeight: '700' },
  recentList: { paddingHorizontal: 20 },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  recentThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E3E7EE',
    marginRight: 12,
  },
  recentInfo: { flex: 1 },
  recentName: { fontSize: 14, fontWeight: '700', color: '#1A1C1E' },
  recentFolder: { fontSize: 12, color: '#8B8F97', marginTop: 2 },
  recentRight: { alignItems: 'flex-end' },
  recentDate: { fontSize: 11, color: '#8B8F97' },
  moreDots: { fontSize: 18, color: '#8B8F97', marginTop: 4 },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 20, color: '#8B8F97' },
  navIconActive: { color: '#2F6BFF' },
  navLabel: { fontSize: 11, color: '#8B8F97', marginTop: 2 },
  navLabelActive: { color: '#2F6BFF', fontWeight: '700' },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#2F6BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  addButtonText: { color: '#fff', fontSize: 28, fontWeight: '400', marginTop: -2 },
});
