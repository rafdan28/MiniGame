import {Text, View, StyleSheet} from "react-native";
import Title from "../components/Title";

function GameScreen(){
    return(
        <View style = {styles.screen}>
            <Title style = {styles.title}>Opponent's Guess</Title>
            <View>
                <Text> Il numero inserito è più grande o più piccolo?</Text>
                {/*+*/}
                {/*-*/}
            </View>
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
});