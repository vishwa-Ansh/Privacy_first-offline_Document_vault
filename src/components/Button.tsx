import { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";


export default function Button({title, on}:{title:string, on:()=>void}) {
  const fullText = title;
  const [text, setText] = useState("");
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const startTyping = () => {
      let index = 0;
      setText("");

      interval = setInterval(() => {
        if (index < fullText.length) {
          setText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval!);

          timeout = setTimeout(() => {
            startTyping();
          }, 5000);
        }
      }, 120);
    };

    startTyping();

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, []);


  return (
    <TouchableOpacity style={styles.button} onPress={on}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
    button:{
        backgroundColor:'rgba(255,255,255, 0.3)',
        position:'absolute',
        bottom:55,
        paddingVertical:9,
        width:Dimensions.get('window').width * 0.85,
        // paddingHorizontal:30,
        alignItems:'center',
        alignSelf:'center',
        borderRadius:23,
        borderWidth:1,
        borderColor:'rgba(255,255,255,0.5)',
        shadowColor: Platform.OS =='android' ? 'rgba(0,0,0,0.3)':'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius:3,
        elevation: 2.5,

    },
    buttonText:{
        color :'#485ce0',
        fontWeight:'700',
        fontSize:18,
        letterSpacing:1
        


    }
})