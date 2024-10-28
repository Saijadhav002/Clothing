import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StatusBar, ActivityIndicator, PermissionsAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import CommonTextInput from '../components/CommonTextInput';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccount = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageData, setimageData] = useState('');

    useEffect(() => {
        const loadImageUri = async () => {
            try {
                const uri = await AsyncStorage.getItem('profileImage');
                if (uri) setimageData(uri);
            } catch (error) {
                console.error("Failed to load the image URI:", error);
            }
        };
        loadImageUri();
        
    }, []);

    useEffect(() => {
        const saveEmail = async () => {
            if (email.length > 0) {
                try {
                    await AsyncStorage.setItem('Name', email);
                    console.log("Name saved successfully");
                } catch (error) {
                    console.error("Failed to save the Name:", error);
                }
            }
        };
        saveEmail();
    }, [email]);

    const handleDoneClick = () => {
        signUpWithEmail(email, passWord);
    };

    const handleBackNavigation = () => navigation.navigate("OnBoarding");

    const signUpWithEmail = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User account created & signed in!', user);
            navigation.navigate("Dashboard");

        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('This email address is already in use.');
                    break;
                case 'auth/invalid-email':
                    alert('Please provide a valid email address.');
                    break;
                case 'auth/weak-password':
                    alert('Your password is too weak. Please choose a stronger password.');
                    break;
                case 'auth/network-request-failed':
                    alert('Network error. Please check your connection.');
                    break;
                default:
                    alert('Error creating account. Please try again later.');
                    console.error('Error code:', error.code, 'Message:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const saveImageUri = async (uri) => {
        try {
            await AsyncStorage.setItem('profileImage', uri);
            console.log("Image URI saved successfully");
        } catch (error) {
            console.error("Failed to save the image URI:", error);
        }
    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Camera Permission",
                    message: "App needs access to your camera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (hasPermission) {
            launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.error('ImagePicker Error:', response.errorMessage);
                } else if (response.assets) {
                    const uri = response.assets[0].uri;
                    setimageData(uri);
                    saveImageUri(uri);
                }
            });
        } else {
            alert("Camera permission is required to take photos");
        }
    };

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('ImagePicker Error:', response.errorMessage);
            } else if (response.assets) {
                const uri = response.assets[0].uri;
                setimageData(uri);
                saveImageUri(uri);
            }
        });
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <LinearGradient
                colors={['#F6F7ED', '#CDEDF8', '#F5C8F1']}
                start={{ x: 0.3, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientContainer}
            >
                <ImageBackground
                    source={require("../assets/Bubbles.png")}
                    style={styles.backgroundImage}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardAvoidingView}
                    >
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.contentContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.text}>Create</Text>
                                    <Text style={styles.text}>Account</Text>
                                </View>
                                <TouchableOpacity style={styles.headerContainer} onPress={() => openCamera()}>
                                    <Image source={imageData.length > 0 ? { uri: imageData } : require("../assets/Upload_Photo.png")} style={imageData.length > 0 ? styles.uploadedImage : styles.uploadImage} resizeMode='stretch' />
                                </TouchableOpacity>
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
                                {loading ? (
                                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: verticalScale(30) }} />
                                ) : (
                                    <>
                                        <CommonButton
                                            title={"Done"}
                                            extraStyles={{ marginTop: verticalScale(30), width: scale(150) }}
                                            onPress={handleDoneClick}
                                        />
                                        <CommonButton
                                            title={"Cancel"}
                                            extraStyles={{ marginTop: verticalScale(10), width: scale(150), backgroundColor: "transparent" }}
                                            onPress={handleBackNavigation}
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
        height: verticalScale(300),
        width: "100%",
        resizeMode: 'cover',
    },
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(20),
        marginBottom: verticalScale(50),
    },
    headerContainer: {
        marginTop: verticalScale(75),
        alignItems: "flex-start",
        width: "100%",
    },
    text: {
        fontSize: scale(50),
        color: 'black',
        fontWeight: "500",
    },
    uploadImage: {
        width: scale(70),
        height: verticalScale(70),
    },
    uploadedImage: {
        borderRadius: 50,
        width: scale(80),
        height: verticalScale(80),
        backgroundColor: "black",
        borderWidth: scale(6),
        borderColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

export default CreateAccount;
