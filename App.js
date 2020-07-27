import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';  //allows me to load fonts
import { AppLoading } from 'expo';  //prolongs page loading until assets are loaded

import Header from './components/Header';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


const fetchFonts = () => {

    // key: the name by which refers to a particular font
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {

    const [userNumber, setUserNumber] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [rounds, setRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    // render <AppLoading /> until async fetchFonts returns a promise
    // executes onFinish afterwards
    if (!dataLoaded) {
        return <AppLoading 
                    startAsync={fetchFonts}  
                    onFinish={() => setDataLoaded(true)} 
                    onError={(err) => console.log(err)}
                /> 
    }

    const startGame = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setRounds(0); 
        setGameOver(false);  
    };

    const gameOverHandler = (numOfRounds) => {
        setRounds(numOfRounds);
        setGameOver(true);
    }


    let content = <StartScreen onStartGame={startGame}/>;

    if (userNumber && rounds <= 0) {      //(userNumber && !gameOver)
        content = <GameScreen userChoice={userNumber} 
                    onGameOver={gameOverHandler}
                    /> 
    } else if ( gameOver) {
        content = <GameOverScreen rounds={rounds} 
                    userNumber={userNumber}  
                    restart={startGame} />;     //argument = null
    }


    return (
        <View style={styles.screen}>
            <Header title="Guess a Number"/>
            { content }
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
