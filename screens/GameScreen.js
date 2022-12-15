import {Text, View, StyleSheet} from "react-native";

function GameScreen(){
    return(
        <View style = {styles.screen}>
            <Text>Opponent's Guess</Text>
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

   }
});