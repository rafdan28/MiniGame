import {TextInput, View, StyleSheet, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import {useState} from "react";

function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber] = useState('');

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

    return(
        <View style = {styles.inputContainer}>
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
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elavation: 4,          //per l'ombra su android
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.25
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