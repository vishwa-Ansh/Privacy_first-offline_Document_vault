import Button from "@/components/Button";
import { Stack, router } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const window =  Dimensions.get('window')
// console.log(Dimensions.get('window'))

export default function Index() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTransparent: true, 
        headerBackVisible:true,
        headerBackTitle:'',
        headerTitle:''
       }} />
      <Image source={require("../../../assets/images/pages/page_4.jpg")} style={styles.image} resizeMode='cover' />
      <Button title="Next →" on={()=>router.push('/instruction/Trust_info')}/>
      <View>
        <Text>hwllo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    width: window.width,
    // paddingVertical:10,
    // paddingHorizontal:20,
    backgroundColor: 'white'

    
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
