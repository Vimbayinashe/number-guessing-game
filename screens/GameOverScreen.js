import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';




const GameOverScreen = (props) => {

    const [detectedHeight, setDetectedHeight] = useState(Dimensions.get('window').height); 
    const [detectedWidth, setDetectedWidth] = useState(Dimensions.get('window').width); 

    // re-calculate window height when orientation changes
    useEffect(() => {
        const updateLayout = () => {
            setDetectedHeight(Dimensions.get('window').height);
            setDetectedWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', updateLayout);
        
        // cleans event listener
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

   
   return(
      <ScrollView>
       <View style={styles.screen}>
           <TitleText>Game Over!</TitleText>
           <View style={{...styles.imageContainer, ...{
                      width: detectedHeight < 500 ? detectedHeight *0.7 : detectedWidth * 0.7,
                      height: detectedHeight < 500 ? detectedHeight *0.7 :  detectedWidth * 0.7,
                      borderRadius: detectedWidth,
                      marginVertical: detectedWidth / 30,
           }}} >
                <Image 
                    source={require('../assets/images/success.png')}
                    // source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Rosa_summit.jpg/220px-Monte_Rosa_summit.jpg'}} 
                    style={styles.image}
                    resizeMode='cover' 
                    // fadeDuration={350}   //default is 300 
                />
            </View>
            <View style={{...styles.resultContainer, ...{
                marginVertical: detectedHeight / 60
            }}}>
                <BodyText style={{...styles.resultText, ...{
                    fontSize: detectedHeight < 400 ? 16 : 20
                }}}>
                    Your phone needed{' '}
                    <Text style={styles.highlight}>{props.rounds}</Text>
                    {' '} rounds to guess the number{' '}
                    <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            <MainButton onPress={() => props.restart(null)}>
                New Game
            </MainButton>
           {/* <Button title="New Game" onPress={() => props.restart(null)} /> */}
       </View>
      </ScrollView> //if needed on smaller screens
   )
};

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       paddingVertical: 10,
       paddingBottom: 30,
   },
   imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        // width: 300,     
        // height: 300,     
        // borderRadius: 150,
        maxWidth: '80%',
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',  //crops image into container
        marginVertical: Dimensions.get('window').height / 30,
   },
   image: {
       width: '100%',
       height: '100%',
   }, 
   highlight: {
       color: Colors.primary,
       fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 30,
        // => margin along the horizontal x-axis
        marginVertical: Dimensions.get('window').height / 40,
   },
   resultText: {
       color: Colors.primary,
       fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
       marginVertical: 20,
       textAlign: 'center',
   },
});

export default GameOverScreen;


{/* <BodyText>
                    Number of rounds: 
                    <Text style={styles.highlight}>{props.rounds}</Text>
                    </BodyText>
                <BodyText>
                    Number was: 
                    <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText> */}