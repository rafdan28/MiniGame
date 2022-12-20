import {View, StyleSheet, Alert, FlatList, useWindowDimensions} from "react-native";
import {useEffect, useState} from "react";
import {Ionicons} from '@expo/vector-icons'

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

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
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const {width} = useWindowDimensions();

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {   //questa funzione effetto viene eseguita solo la prima volta che il componente GameScreen viene valutato
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

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
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
        console.log(newRndNumber);
    }

    const guessRoundsListLength = guessRounds.length;

    let content = (
        <>
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
        </>
    );

    if(width > 500){
        content = (
            <>
                <InstructionText mystyle = {styles.instructionText}>
                    Higher or lower?
                </InstructionText>
                <View style = {styles.buttonsContainerWide}>
                    <View style = {styles.buttonContainer}>
                        <PrimaryButton onPressButton = {nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name = "md-remove" size = {24} color = "white"/>
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style = {styles.buttonContainer}>
                        <PrimaryButton onPressButton = {nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name = "md-add" size = {24} color = "white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );

    }

    return(
        <View style = {styles.screen}>
            <Title style = {styles.title}>Opponent's Guess</Title>
            {content}
            <View style = {styles.listContainer}>
                {/*{guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)}*/}
                <FlatList
                    data = {guessRounds}
                    renderItem = {(itemData) => (
                        <GuessLogItem
                            roundNumber = {guessRoundsListLength - itemData.index}
                            guess = {itemData.item}
                        />
                    )}
                    keyExtractor = {(item) => item} //funzione inserita perchè i nostri guessRounds (numeri)
                                                    // sono tipi primitivi, e quindi non hanno una chiave
                                                    //vengono presi come chiave, gli elementi stessi (item)
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
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

    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    listContainer: {
        flex: 1,
        padding: 16
    }
});