import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const CommonButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress ? props.onPress() : console.log("icon pressed!")} style={[Styles.parentContainer, props.extraStyles]}>
            <Text style={[Styles.textStyle, { ...props.extraTextStyles }]}>{props.title ? props.title : "CommonButton"}</Text>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    parentContainer: {
        backgroundColor: "#155EEF",
        width: "80%",
        padding: moderateScale(18),
        borderRadius: moderateScale(18),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontSize: scale(22)
    }
})

export default CommonButton