import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

import DefaultStyles from '../constants/default-styles';


const GameScreen = (props) => {
   
    const initialGuess = generateRandomNumber(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [rounds, setRounds] = useState(0);    /** remove */
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    // props deconstruction (of SOME props not all)
    const { userChoice, onGameOver } = props;

    // end game if computer opponents guesses correct!
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds);
            // props.onGameOver(pastGuesses.length);    //alternative
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
            currentMin.current = currentGuess + 1;
        }

        const nextNumber = generateRandomNumber(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);  /** remove */
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])

    }


    return(
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                {/* <Button title="Smaller" onPress={nextGuess.bind(this, 'lower')} /> */}
                <MainButton onPress={() => nextGuess('smaller')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={() => nextGuess('greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.list}>
                {/* <ScrollView contentContainerStyle={styles.listContent}> 
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                
                <FlatList data={pastGuesses}
                    renderItem={itemData => (renderFlatListItem( pastGuesses.length, itemData))}
                    // renderItem={renderFlatListItem.bind( this, pastGuesses.length)}  //reverse args in fxn (line 137)
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.listContent}
                />
            </View>
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
        width: 400,
        maxWidth: '90%' 
    },
    listContent: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    list: {
        flex: 1,
        width: '60%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '60%',
    },
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

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem} >
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);


const renderFlatListItem = (listLength, itemData) => (
    <View style={styles.listItem} >
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);