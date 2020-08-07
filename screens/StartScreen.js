import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const StartScreen = (props) => {
   
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmGame, setConfirmGame] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(); 
    
    const validateInput = (text) => {
        // drops any non-numerical values
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    }

    const resetInput = () => {
        setEnteredValue('');
        setConfirmGame(false);
    };

    const confirmInputHandler = () => {
        const selectedNumber = parseInt(enteredValue);
        //if (typeof(selectedNumber) !== 'number' || selectedNumber <= 0)
        if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > 99) {
            Alert.alert(
                'Invalid number:', 
                'Number must be between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInput}]
            );
            return; //add appropriate msg feedback to user
        }
        setConfirmGame(true);
        setSelectedNumber(selectedNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput = confirmGame &&  
        <Card style={{...styles.outputNumber, ...styles.inputContainer}}>
            <Text>You Selected: </Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                Start Game
            </MainButton>
        </Card>

        

return(
    <ScrollView>
    <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input style={styles.input} 
                        autoCapitalize="none" 
                        blurOnSubmit 
                        keyboardType="number-pad" 
                        maxLength={2} 
                        onChangeText={validateInput}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button color={Colors.accent} title="Reset" onPress={resetInput} />
                        </View>
                        <View style={styles.button}>
                            <Button color={Colors.primary} title="Confirm" onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
                {/* <View > {confirmedOutput} </View> */}
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
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
        marginVertical: 10, //=> marginTop & marginBottom
        fontFamily: 'open-sans-bold'
   },
   inputContainer: {
        minWidth: 300,
        width: '80%',
        maxWidth: '95%',
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
    //    width: '40%',     //OR Dimensions API
       width: Dimensions.get('window').width / 4,
   },
   input: {
       width: 60,
       textAlign: 'center'
   },
   userFeedback: {
       margin: 15
   },
   outputNumber: {
       marginTop: 25,
       shadowRadius: 1,
       elevation: 2,
   }
});

export default StartScreen;
