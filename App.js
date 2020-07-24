import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

    const [userNumber, setUserNumber] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [rounds, setRounds] = useState(0);

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
