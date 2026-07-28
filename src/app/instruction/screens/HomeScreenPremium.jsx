import { Stack } from 'expo-router';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

 import { SafeAreaView } from 'react-native-safe-area-context';
const COLORS = {
  navy: '#12172B',
  navyDark: '#0B0E1C',
  gold: '#C9A24B',
  goldSoft: '#F3E9D2',
  bg: '#F6F7FB',
  card: '#FFFFFF',
  textPrimary: '#12172B',
  textSecondary: '#6B7280',
  textMuted: '#9AA1AC',
  border: '#EEF0F4',
};

const placeholder = { uri: 'https://placehold.co/160x110/12172B/ffffff?text=DOC' };

const QUICK_ACCESS = [
  { id: '1', title: 'Aadhaar Card', img: 'https://images.moneycontrol.com/static-mcnews/2025/04/20250404112835_Aadhaar-card-generated-using-AI-690x435.png ', verified: true },
  { id: '2', title: 'PAN Card', img: 'https://www.pancardapp.com/blog/wp-content/uploads/2019/04/sample-pan-card.jpg', verified: true },
  { id: '3', title: 'Passport', img:"image.png", verified: true },
  { id: '4', title: 'Driving License', img: placeholder, verified: true },
  { id: '5', title: 'Voter ID', img: placeholder, verified: false },
];

const FOLDERS = [
  { id: '1', title: 'Identity', count: 5, icon: '🪪' },
  { id: '2', title: 'Banking', count: 8, icon: '🏦' },
  { id: '3', title: 'Education', count: 6, icon: '🎓' },
  { id: '4', title: 'Government', count: 7, icon: '🏛️' },
  { id: '5', title: 'Health', count: 4, icon: '⚕️' },
  { id: '6', title: 'Vehicle', count: 4, icon: '🚗' },
];

const RECENT_DOCS = [
  { id: '1', name: 'Aadhaar Card.jpg', folder: 'Identity', date: 'Today, 09:30 AM' },
  { id: '2', name: 'SBI Passbook.pdf', folder: 'Banking', date: 'Yesterday, 06:15 PM' },
];

export default function HomeScreenPremium() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{
        headerShown:false
      }}/>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.navy} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
        
          <View style={styles.greetingSection}>
            <Text style={styles.eyebrow}>WELCOME BACK</Text>
            <Text style={styles.greeting}>Hello, User</Text>
            <Text style={styles.subGreeting}>All your important documents, secure & offline.</Text>
          </View>

          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search documents, folders..."
              placeholderTextColor={COLORS.textMuted}
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.iconTextDark}>▽</Text>
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity key={item.id} style={styles.quickCard} activeOpacity={0.85}>
              <View>
                <Image source={{uri:String(item.img).trim()}} style={styles.quickImage} />
                {item.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
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
            <TouchableOpacity key={folder.id} style={styles.folderCard} activeOpacity={0.85}>
              <View style={styles.folderIconWrap}>
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
                <Text style={styles.recentFolder}>{doc.folder}</Text>
              </View>
              <View style={styles.recentRight}>
                <Text style={styles.recentDate}>{doc.date}</Text>
                <Text style={styles.moreDots}>⋮</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 110 }} />
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

const shadow = {
  shadowColor: '#12172B',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.06,
  shadowRadius: 14,
  elevation: 3,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg},
  header: {
    backgroundColor: COLORS.navy,
    paddingTop: Platform.OS === 'ios' ? 4 : 16,
    paddingBottom: 26,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconButtonDark: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextLight: { fontSize: 16, color: '#fff' },
  iconTextDark: { fontSize: 16, color: COLORS.textPrimary },
  premiumPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,162,75,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,75,0.4)',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
    gap: 6,
  },
  premiumPillIcon: { fontSize: 13 },
  premiumPillText: { fontSize: 12, fontWeight: '700', color: COLORS.gold, letterSpacing: 0.3 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E15554',
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.navy,
  },
  badgeText: { color: '#fff', fontSize: 9.5, fontWeight: '800' },
  greetingSection: { marginTop: 22 },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gold,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  greeting: { fontSize: 26, fontWeight: '800', color: '#fff', letterSpacing: 0.2 },
  subGreeting: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 6, lineHeight: 18 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    marginTop: 22,
    ...shadow,
  },
  searchIcon: { marginRight: 8, fontSize: 15 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary },
  filterButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 26,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: 0.1 },
  viewAll: { fontSize: 13, color: COLORS.gold, fontWeight: '700' },
  quickAccessRow: { paddingLeft: 20, paddingRight: 8 },
  quickCard: { width: 140, marginRight: 14 },
  quickImage: {
    width: 140,
    height: 96,
    borderRadius: 14,
    backgroundColor: '#E3E7EE',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.gold,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  verifiedText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  quickTitle: { marginTop: 10, fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  foldersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  folderCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    ...shadow,
  },
  folderIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  folderIcon: { fontSize: 20 },
  folderTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  folderCount: { fontSize: 12, color: COLORS.textMuted, marginTop: 2, marginBottom: 12 },
  folderThumbsRow: { flexDirection: 'row', gap: 6 },
  thumbSmall: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  thumbMore: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbMoreText: { fontSize: 9.5, color: COLORS.gold, fontWeight: '800' },
  recentList: { paddingHorizontal: 20 },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    ...shadow,
  },
  recentThumb: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
  },
  recentInfo: { flex: 1 },
  recentName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  recentFolder: { fontSize: 12, color: COLORS.textMuted, marginTop: 3 },
  recentRight: { alignItems: 'flex-end' },
  recentDate: { fontSize: 11, color: COLORS.textMuted },
  moreDots: { fontSize: 18, color: COLORS.textMuted, marginTop: 6 },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.navy,
    paddingVertical: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 19, color: 'rgba(255,255,255,0.45)' },
  navIconActive: { color: COLORS.gold },
  navLabel: { fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 3 },
  navLabelActive: { color: COLORS.gold, fontWeight: '700' },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -34,
    borderWidth: 4,
    borderColor: COLORS.bg,
  },
  addButtonText: { color: '#fff', fontSize: 28, fontWeight: '400', marginTop: -2 },
});
