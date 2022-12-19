import {Image, View, StyleSheet, Text} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen(){
    return(
        <View style = {styles.rootContainer}>
            <Title>GAME OVER!</Title>
            <View style = {styles.imageContainer}>
                <Image
                    style = {styles.image }
                    source = {require('../assets/images/success.png')}
                />
            </View>
            <Text style = {styles.summaryText}>
                Il telefono ha indovinato in <Text style = {styles.highlight}>X</Text> mosse il numero <Text style = {styles.highlight}>Y</Text>.
            </Text>
            <PrimaryButton>Nuova Partita</PrimaryButton>
        </View>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageContainer: {
        width: 400,
        height: 400,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },

    image: {
        width: '100%',
        height: '100%'
    },

    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },

    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})