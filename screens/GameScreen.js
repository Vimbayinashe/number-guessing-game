import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const GameScreen = (props) => {
   
    const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(1, 100, props.userChoice));

    const [rounds, setRounds] = useState(0);
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    // props deconstruction (of SOME props not all)
    const { userChoice, onGameOver } = props;

    // end game if computer opponents guesses correct!
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver, rounds]);
    // }, [currentGuess, props.userChoice, props.onGameOver, props.rounds]);    
    //everytime anything in props changes this useEffect would re-render otherwise


    const nextGuess = (comparison) => {
        
        if ((comparison === 'smaller' && currentGuess < props.userChoice) ||   
            (comparison === 'greater' && currentGuess > props.userChoice)) {
                Alert.alert(
                    "Incorrect comparison:", 
                    "Please enter the correct comparison", 
                    [{text: "Okay", style: 'cancel'}] 
                );
            return;
        }

        if (comparison === "smaller") {
            currentMax.current = currentGuess;
        } else {
            currentMin.current = currentGuess;
        }

        const nextNumber = generateRandomNumber(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    }


    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                {/* <Button title="Smaller" onPress={nextGuess.bind(this, 'lower')} /> */}
                <Button title="Smaller" onPress={() => nextGuess('smaller')} />
                <Button title="Greater" onPress={() => nextGuess('greater')} />
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       padding: 10,
       alignItems: 'center'
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      width: 300,
      maxWidth: '80%' 
   }
});

export default GameScreen;


const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let random = Math.floor(Math.random() * (max - min)) + min;

    if(random === exclude) {
        return generateRandomNumber(min, max, exclude);
    } else {
        return random;
    }
};