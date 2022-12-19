import {Pressable, Text, View, StyleSheet} from "react-native";

import Colors from "../../constants/colors";

function PrimaryButton({children, onPressButton}){
    return(
        <View style = {styles.buttonOuterContainer}>
            <Pressable
                style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.buttonPressed] : styles.buttonInnerContainer}
                onPress = {onPressButton}
                android_ripple={{color: Colors.primary600}}
            >
                <Text style = {styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden" //nasconde gli effetti che vanno al di fuori del container
    },

    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
    },

    buttonPressed: {
      opacity: 0.75,

    },
});