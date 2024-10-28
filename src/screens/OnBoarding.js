import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from '../components/CommonButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const OnBoarding = () => {

    const navigation = useNavigation();

    const handleButtonClick = () => navigation.navigate("CreateAccount");
    const handleLoginNavigation = () => navigation.navigate("Login");


    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <LinearGradient
                colors={['#F6F7ED', '#CDEDF8', '#F5C8F1']}
                start={{ x: 0.3, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <View style={styles.upperContainer}>
                    <View style={styles.bannerContainer}>
                        <LinearGradient
                            colors={['#FDE7F3', '#EAE9FF', '#DFFFEE']}
                            start={{ x: 0.3, y: 0.3 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.bagImageContainer}
                        >
                            <Image source={require("../assets/bag.png")} style={styles.bagImage} resizeMode='contain' />
                        </LinearGradient>

                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTextStyle}>Shoppe</Text>
                        </View>
                        <View style={styles.headerParaContainer}>
                            <Text style={styles.headerparastyle}>Beautiful eCommerce UI Kit for your online store</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    <CommonButton
                        title={"Let's get started"}
                        extraStyles={{ marginVertical: verticalScale(30) }}
                        onPress={() => handleButtonClick()}
                    />
                    <View style={styles.iconContainer}>
                        <View>
                            <Text style={styles.accountText}>I already have an account </Text>
                        </View>
                        <TouchableOpacity style={styles.arrowContainer} onPress={() => handleLoginNavigation()}>
                            {/* <Text style={styles.arrowText}>{">"}</Text> */}
                            {/* <Image source={require("../assets/next.png")} style={styles.bagImage} resizeMode='contain' /> */}
                            <Icon name="arrow-right" color="white" size={19} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient >
        </>
    );
}

const styles = StyleSheet.create({
    upperContainer: {
        flex: 3,
        padding: moderateScale(25),  // Scaled padding
    },
    lowerContainer: {
        flex: 1,
        justifyContent: 'center', // Centering content vertically
        alignItems: 'center', // Centering content horizontally
    },
    bannerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    bagImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: scale(180),  // Scaled width
        height: scale(180),  // Scaled height
        borderRadius: scale(90),  // Scaled borderRadius
        backgroundColor: "#85ffd6",
        shadowColor: "#d9d9d9",
        shadowOffset: { width: scale(20), height: scale(20) },  // Scaled shadowOffset
        shadowOpacity: 1,
        shadowRadius: scale(60),  // Scaled shadowRadius
        elevation: 5,
    },
    bagImage: {
        width: '65%',
        height: '65%',
    },
    headerTextContainer: {},
    headerTextStyle: {
        fontSize: scale(50),  // Scaled font size
        color: "black",
        fontWeight: "500"
    },
    headerParaContainer: {
        marginVertical: verticalScale(10)  // Scaled margin
    },
    headerparastyle: {
        fontSize: scale(21),  // Scaled font size
        color: "black",
        textAlign: "center"
    },
    iconContainer: {
        flexDirection: 'row', // Align text and icon horizontally
        alignItems: 'center', // Align vertically
        // marginTop: verticalScale(20), // Add margin from the button
    },
    accountText: {
        fontSize: scale(16),
        color: 'black',
    },
    iconStyle: {
        marginLeft: scale(10), // Space between text and icon
    },
    iconContainer: {
        marginBottom: verticalScale(15),
        flexDirection: "row",
        alignItems: "center"
    },
    arrowContainer: {
        height: verticalScale(30),
        width: scale(30),
        backgroundColor: "#155EEF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 150,
    },
    arrowText: {
        textAlign: "center",
        fontSize: scale(20),  // Adjust the size to make it look more like an arrow
        color: 'white',  // Change the color as needed
    }
});

export default OnBoarding;
