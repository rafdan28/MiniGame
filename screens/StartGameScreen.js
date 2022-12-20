import {TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import {useState} from "react";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber] = useState('');

    const {width, height} = useWindowDimensions();

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText);
    }

    function resetInputHandler(){
        setEnteredNumber('');
    }

    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Valore non corretto',
                'Inserisci un numero tra 1 e 99',
                [{text: 'OK', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        console.log('Valid Number: ' + chosenNumber);
        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 380 ? 30 : 100;

    return(
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style = {[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Indovina il mio numero</Title>
                    <Card>
                        <InstructionText>Inserisci un numero</InstructionText>
                        <TextInput
                            style = {styles.numberInput}
                            maxLength = {2}
                            keyboardType = "number-pad"  //permette di poter scrivere solo numeri
                            autoCapitalize = "none" //permette che non venga scritto automaticamente in maiuscolo
                            autoCorrect = {false}
                            onChangeText = {numberInputHandler}
                            value = {enteredNumber}
                        />
                        <View style = {styles.buttonsContainer}>
                            <View style = {styles.buttonContainer}>
                                <PrimaryButton onPressButton={resetInputHandler}>Reset</PrimaryButton>
                            </View>

                            <View style = {styles.buttonContainer}>
                                <PrimaryButton onPressButton={confirmInputHandler}>Conferma</PrimaryButton>
                            </View>

                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight < 400 ? 30 : 100  ,
        alignItems: 'center'
    },

    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    buttonsContainer: {
      flexDirection: 'row',
    },

    buttonContainer: {
        flex: 1,
    },
});