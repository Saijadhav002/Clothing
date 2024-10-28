import { View, Text, Button, ActivityIndicator, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CommonButton from '../components/CommonButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/Footer';


const Dashboard = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [userName, setuserName] = useState('');
    // console.log(userName, "userName");
    const regex = /^([a-zA-Z]+)/; // Matches only alphabetical characters at the start

    const match = userName.match(regex);

    const name = match ? match[1].slice(0, 3) : "";



    useEffect(() => {
        const loadImageUri = async () => {
            try {
                const uri = await AsyncStorage.getItem('profileImage');
                const username = await AsyncStorage.getItem('Name');
                if (uri) setProfileImage(uri);
                setuserName(username);
            } catch (error) {
                console.error("Failed to load the profile image URI:", error);
            }
        };
        loadImageUri();
    }, []);

    const signOut = async () => {
        setLoading(true);
        try {
            await auth().signOut();
            console.log('User signed out!');
            navigation.navigate("OnBoarding");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVouchersClick = () => {
        console.log("handleVouchersClicked!!");
    };

    const handleTopMenuClick = () => {
        console.log("handleTopMenuClick!!");
    };

    const handleSettingsClick = () => {
        console.log("handleSettingsClick!!");
    };

    const navbarIcons = [
        {
            "id": 0,
            "src": require("../assets/Vouchers.png"),
            "pressed": handleVouchersClick
        },
        {
            "id": 1,
            "src": require("../assets/TopMenu.png"),
            "pressed": handleTopMenuClick
        },
        {
            "id": 2,
            "src": require("../assets/Settings.png"),
            "pressed": handleSettingsClick
        }
    ];

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <LinearGradient
                        colors={['#F6F7ED', '#CDEDF8', '#F5C8F1']}
                        start={{ x: 0.3, y: 0.3 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientContainer}
                    >
                        {/* Navbar section starts */}
                        <LinearGradient
                            colors={scrollPosition > 50 ? ['#F6F7ED', '#CDEDF8', '#F5C8F1'] : ['transparent', 'transparent', 'transparent']}
                            start={{ x: 0.3, y: 0.3 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.navbar}
                        >
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} resizeMode='stretch' />
                            ) : (
                                <Image source={require("../assets/user.png")} style={styles.profileImage} resizeMode='contain' />
                            )}
                            <CommonButton
                                title={"My Activity"}
                                extraStyles={styles.myActivity}
                                extraTextStyles={{ fontSize: scale(15) }}
                            />
                            <View style={styles.navbarIconsContainer}>
                                {navbarIcons.map((icon, index) => (
                                    <TouchableOpacity key={index} style={styles.headerContainer} onPress={icon.pressed}>
                                        <Image source={icon.src} style={styles.navbarIcons} resizeMode='contain' />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </LinearGradient>
                        {/* Navbar section ends */}
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            onScroll={(event) => setScrollPosition(event.nativeEvent.contentOffset.y)} // Track scroll position
                            scrollEventThrottle={16}
                        >
                            {/* banner_section_one_starts */}
                            <View style={styles.banner_section_one_container}>
                                <View style={styles.greetings_header_container}>
                                    <Text style={styles.greetings_header}>Hello, {name}!</Text>
                                </View>
                                <View style={styles.announcements_container}>
                                    <Text style={{ fontSize: scale(17), color: "black", fontWeight: "bold" }}>Annoucement</Text>
                                    <View style={styles.arrowbuttonTextContainer}>
                                        <View style={{ width: "85%", marginTop: verticalScale(3) }}>
                                            <Text style={{ fontSize: scale(12), color: "black", lineHeight: verticalScale(15) }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit luctus libero ac vulputate.
                                            </Text>
                                        </View>

                                        <TouchableOpacity style={styles.arrowContainer} >
                                            <Icon name="arrow-right" color="white" size={19} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {/* banner_section_one_ends */}
                            {/* banner_section_two_start */}

                            {/* banner_section_two_ends */}
                        </ScrollView>
                    </LinearGradient>
                    <Footer />
                </>
            )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        paddingTop: moderateScale(37),
        paddingLeft: moderateScale(20),
    },
    container: {
        flex: 1,
    },
    profileImage: {
        borderRadius: 50,
        width: scale(52),
        height: verticalScale(50),
        borderWidth: scale(6),
        borderColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: moderateScale(10)
    },
    myActivity: {
        marginLeft: scale(10),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(5),
        width: scale(100),
        borderRadius: moderateScale(50),
        padding: moderateScale(13)
    },
    navbarIconsContainer: {
        marginLeft: scale(20),
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    navbarIcons: {
        borderRadius: 50,
        width: scale(35),
        height: verticalScale(35),
        borderWidth: scale(1),
        borderColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    banner_section_one_container: {
        marginRight: moderateScale(15)
    },
    greetings_header: {
        color: "black",
        fontSize: scale(35),
        fontWeight: "bold"
    },
    announcements_container: {
        backgroundColor: "#e8e8e8",
        borderRadius: moderateScale(5),
        padding: moderateScale(9),
        paddingLeft: scale(15),
        marginTop: verticalScale(15),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        marginLeft: scale(7)
    },
    arrowbuttonTextContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    rightArrowButtonStyle: {
        width: scale(52),
        height: verticalScale(50),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    arrowContainer: {
        height: verticalScale(35),
        width: scale(37),
        backgroundColor: "#155EEF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 150,
    },
});

export default Dashboard;
