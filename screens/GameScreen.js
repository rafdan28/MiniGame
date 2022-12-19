import {View, StyleSheet, Alert} from "react-native";
import {useEffect, useState} from "react";
import {Ionicons} from '@expo/vector-icons'

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function generateRandomBetwen(min, max, exclude){
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude){  //permette di non indovinare al primo colpo il numero
        return generateRandomBetwen(min, max, exclude);
    }
    else{
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomBetwen(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction){ //direction => 'lower' or 'greater
        if((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert('Non mentire',
                'So che stai mentendo...',
                [{text: 'Sorry', style: 'cancel'}])
            return;
        }

        if(direction === 'lower'){ //indovinare un numero più basso, quindi aggiornare il limite massimo
            maxBoundary = currentGuess;
        }
        else{
            minBoundary = currentGuess + 1; // +1 in modo tale da escludere il minimo dalla generazione randomica del numero
        }
        const newRndNumber = generateRandomBetwen(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        console.log(newRndNumber);
    }

    return(
        <View style = {styles.screen}>
            <Title style = {styles.title}>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText mystyle = {styles.instructionText}> Higher or lower?</InstructionText>
                <View style = {styles.buttonsContainer}>
                    <View style = {styles.buttonContainer}>
                        <PrimaryButton onPressButton = {nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name = "md-remove" size = {24} color = "white"/>
                        </PrimaryButton>
                    </View>
                    <View style = {styles.buttonContainer}>
                        <PrimaryButton onPressButton = {nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name = "md-add" size = {24} color = "white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View>
                {/*LOG ROUNDS*/}
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },

    instructionText: {
        marginBottom: 12,
    },

    buttonsContainer: {
        flexDirection: 'row',
    },

    buttonContainer: {
        flex: 1,
    },
});