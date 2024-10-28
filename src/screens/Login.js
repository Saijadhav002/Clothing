import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import CommonTextInput from '../components/CommonTextInput';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');
    const [loading, setLoading] = useState(false);  // New loading state

    const handleNextClick = () => {
        signInWithEmail(email, passWord);
    }

    const signInWithEmail = async (email, password) => {
        setLoading(true); // Start loading
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User signed in!', user);
            navigation.navigate("Dashboard");
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('The password is incorrect.');
                    break;
                case 'auth/user-not-found':
                    alert('No user found with this email address.');
                    break;
                case 'auth/invalid-email':
                    alert('Please provide a valid email address.');
                    break;
                case 'auth/network-request-failed':
                    alert('Network error. Please check your connection.');
                    break;
                case 'auth/too-many-requests':
                    alert('Too many unsuccessful login attempts. Please try again later.');
                    break;
                default:
                    alert('Error signing in. Please try again later.');
                    console.error('Error code:', error.code, 'Message:', error.message);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            {/* Set the status bar to transparent */}
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <LinearGradient
                colors={['#F6F7ED', '#CDEDF8', '#F5C8F1']}
                start={{ x: 0.3, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientContainer}
            >
                <ImageBackground
                    source={require("../assets/login_background.png")}
                    style={styles.backgroundImage}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardAvoidingView}
                    >
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.contentContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.text}>Login</Text>
                                    <Text style={styles.para}>Good to see you back!</Text>
                                </View>
                                <CommonTextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder={"Email"}
                                    secureTextEntry={false}
                                    extraStyles={{ marginVertical: verticalScale(25), paddingHorizontal: scale(15), borderRadius: moderateScale(50) }}
                                />
                                <CommonTextInput
                                    value={passWord}
                                    onChangeText={setPassword}
                                    placeholder={"Password"}
                                    secureTextEntry={true}
                                    extraStyles={{ paddingHorizontal: scale(15), borderRadius: moderateScale(50) }}
                                />

                                {/* Show loader if loading, otherwise show button */}
                                {loading ? (
                                    <ActivityIndicator size="large" color="#0000ff" />
                                ) : (
                                    <>
                                        <CommonButton
                                            title={"Next"}
                                            extraStyles={{ marginTop: verticalScale(30), width: scale(150) }}
                                            onPress={() => handleNextClick()}
                                            disabled={loading}  // Disable button while loading
                                        />

                                        <CommonButton
                                            title={"Cancel"}
                                            extraStyles={{ marginTop: verticalScale(10), width: scale(150), backgroundColor: "transparent" }}
                                            extraTextStyles={{ color: "black" }}
                                        // onPress={() => handleButtonClick()}
                                        />
                                    </>
                                )}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        resizeMode: 'cover', // Resize the image to cover the entire container
    },
    gradientContainer: {
        flex: 1, // Make sure the gradient covers the whole screen
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1, // Ensure it takes up the full screen height
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1, // Allow content to grow inside the ScrollView
        justifyContent: 'center', // Center content within ScrollView
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: moderateScale(20),
        marginBottom: verticalScale(50),
        marginTop: verticalScale(207),
    },
    headerContainer: {
        marginTop: verticalScale(75),
        alignItems: "flex-start",
        width: "100%",
    },
    text: {
        fontSize: scale(50),
        color: 'black',
        fontWeight: "500"
    },
    uploadImage: {
        width: scale(70),
        height: verticalScale(70),
    },
    para: {
        marginTop: verticalScale(10),
        fontSize: scale(20),
        color: 'black',
    }
});

export default Login;
