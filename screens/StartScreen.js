import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';

const StartScreen = (props) => {
   
    const [value, setValue] = useState('');
    
    const validateInput = (text) => {
        // drops any non-numerical values
        setValue(text.replace(/[^0-9]/g, ''));
    }

return(
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
    }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.input} 
                    autoCapitalize="none" 
                    blurOnSubmit 
                    keyboardType="number-pad" 
                    maxLength={2} 
                    onChangeText={validateInput}
                    value={value}
                />
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
    </TouchableWithoutFeedback>
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
   },
   input: {
       width: 60,
       textAlign: 'center'
   }
});

export default StartScreen;
