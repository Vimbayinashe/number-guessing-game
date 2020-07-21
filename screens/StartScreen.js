import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StartScreen = (props) => {
   
return(
    <View style={styles.screen}>
        <Text>The Game Screen!</Text>
    </View>
)
};

const styles = StyleSheet.create({
   screen: {
       flex: 1,  //object takes up entire space
       padding: 10,
       alignItems: 'center'
   }
});

export default StartScreen;
