import React from 'react';
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

   
   return(
      <ScrollView>
       <View style={styles.screen}>
           <TitleText>Game Over!</TitleText>
           <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/images/success.png')}
                    // source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Rosa_summit.jpg/220px-Monte_Rosa_summit.jpg'}} 
                    style={styles.image}
                    resizeMode='cover' 
                    // fadeDuration={350}   //default is 300 
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText>
                    Number of rounds: 
                    <Text style={styles.highlight}>{props.rounds}</Text>
                    </BodyText>
                <BodyText>
                    Number was: 
                    <Text style={styles.highlight}>{props.userNumber}</Text>
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
//    resultText: {
//        color: Colors.primary,
//        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
//    },
});

export default GameOverScreen;
