import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';

const StartScreen = (props) => {
   
return(
    <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
            <Text>Select a Number</Text>
            <TextInput />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button color={Colors.accent} title="Reset" onPress={() => {}} />
                </View>
                <View style={styles.button}>
                    <Button color={Colors.primary} title="Confirm" onPress={() => {}} />
                </View>
            </View>
        </Card>
    </View>
)
};

const styles = StyleSheet.create({
   screen: {
       flex: 1,  //object takes up entire space
       padding: 10,
       alignItems: 'center'
   },
   title: {
        fontSize: 20,
        marginVertical: 10 //=> marginTop & marginBottom
   },
   inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
   },
   buttonContainer: {
       flexDirection: 'row',
       width: '100%',
       justifyContent: 'space-between',
       paddingHorizontal: 15
   },
   button: {
       borderRadius: 50,
       width: '40%'
   }
});

export default StartScreen;
