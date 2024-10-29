import { View, Text, Button, ActivityIndicator, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView, Dimensions, FlatList, Modal } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CommonButton from '../components/CommonButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/Footer';
import Video from 'react-native-video';

const Dashboard = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [userName, setuserName] = useState('');
    const regex = /^([a-zA-Z]+)/;
    const [currentVideo, setCurrentVideo] = useState(null);

    const match = userName.match(regex);

    const name = match ? match[1].slice(0, 3) : "";
    const screenWidth = Dimensions.get("window").width;
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handleVideoPress = () => {
        setIsFullScreen(true);
    };

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

    const recently_viewed = [
        {
            "id": 0,
            "src": require("../assets/one.jpg"),
            "pressed": handleVouchersClick
        },
        {
            "id": 1,
            "src": require("../assets/two.jpg"),
            "pressed": handleTopMenuClick
        },
        {
            "id": 2,
            "src": require("../assets/three.jpg"),
            "pressed": handleSettingsClick
        },
        {
            "id": 3,
            "src": require("../assets/four.jpg"),
            "pressed": handleTopMenuClick
        },
        {
            "id": 4,
            "src": require("../assets/five.jpg"),
            "pressed": handleSettingsClick
        },
    ];

    const myOrdersText = [
        {
            "id": 0,
            "text": "To Pay",
            "pressed": handleVouchersClick
        },
        {
            "id": 1,
            "text": "To Recieve",
            "pressed": handleTopMenuClick
        },
        {
            "id": 2,
            "text": "To review",
            "pressed": handleSettingsClick
        }
    ];

    const sampleVideos = useMemo(() => [
        { id: 1, videoUrl: require('../assets/video1.mp4'), thumbnailUrl: require('../assets/image1.png'), isLive: true },
        { id: 2, videoUrl: require('../assets/video2.mp4'), thumbnailUrl: require('../assets/image2.png'), isLive: false },
        { id: 3, videoUrl: require('../assets/video3.mp4'), thumbnailUrl: require('../assets/image3.png'), isLive: false },
        { id: 4, videoUrl: require('../assets/video4.mp4'), thumbnailUrl: require('../assets/image4.png'), isLive: false },
        { id: 5, videoUrl: require('../assets/video5.mp4'), thumbnailUrl: require('../assets/image5.png'), isLive: false },
        { id: 6, videoUrl: require('../assets/video6.mp4'), thumbnailUrl: require('../assets/image6.png'), isLive: false },
        { id: 7, videoUrl: require('../assets/video7.mp4'), thumbnailUrl: require('../assets/image7.png'), isLive: false },
    ], []);

    const handleVideoClick = (videoUrl) => {
        setCurrentVideo(videoUrl); // Set the clicked video as the current video
        handleVideoPress()
    };

    const newItems = useMemo(() => [
        {
            id: '1',
            image: 'https://via.placeholder.com/150', // Replace with actual image URL
            description: 'Lorem ipsum dolor sit amet consectetur.',
            price: '$17,00',
        },
        {
            id: '2',
            image: 'https://via.placeholder.com/150', // Replace with actual image URL
            description: 'Lorem ipsum dolor sit amet consectetur.',
            price: '$32,00',
        },
        {
            id: '3',
            image: 'https://via.placeholder.com/150', // Replace with actual image URL
            description: 'Lorem ipsum dolor sit amet consectetur.',
            price: '$21,00',
        },
        // Add more items as needed
    ], []);

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
                            <View style={styles.recently_viewed_container}>
                                <Text style={styles.recently_viewed}>Recently Viewed</Text>
                                <View style={styles.recently_viewed_images_contianer}>
                                    {recently_viewed.map((icon, index) => (
                                        <TouchableOpacity key={index} style={styles.headerContainer}>
                                            <Image source={icon.src} style={styles.recently_viewed_images} resizeMode='stretch' />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            {/* banner_section_two_ends */}
                            {/* banner_section_third_starts */}
                            <View style={styles.my_orders_container}>
                                <Text style={styles.recently_viewed}>My Orders</Text>
                                <View style={styles.my_orders_container_wrapper}>
                                    {myOrdersText.map((item, index) => (
                                        <TouchableOpacity key={index} style={styles.my_orders_container_text}>
                                            <Text style={{ color: "#155EEF" }}>{item.text}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            {/* banner_section_third_ends */}
                            {/* banner_section_fourth_starts */}
                            <View style={styles.my_orders_container}>
                                <Text style={styles.recently_viewed}>Stories</Text>
                                <FlatList
                                    data={sampleVideos}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[styles.storyCard, {
                                                width: screenWidth * 0.4,
                                                height: screenWidth * 0.6,
                                            }]}
                                            onPress={() => handleVideoClick(item.videoUrl)}
                                        >
                                            <Image
                                                source={item.thumbnailUrl}
                                                style={styles.videoThumbnail}
                                                resizeMode="cover"
                                            />
                                            {item.isLive && <Text style={styles.liveBadge}>Live</Text>}
                                            <View style={styles.playIconContainer}>
                                                <Text style={styles.playIcon}>▶</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <Modal
                                visible={isFullScreen}
                                animationType="slide"
                                onRequestClose={() => setIsFullScreen(false)}
                            >
                                <View style={styles.fullScreenContainer}>
                                    <Video
                                        source={{ uri: currentVideo }}
                                        style={styles.fullScreenVideo}
                                        controls={true}
                                        resizeMode="contain"
                                        onEnd={() => {
                                            setCurrentVideo(null);
                                            setIsFullScreen(false);
                                        }}
                                    />
                                </View>
                            </Modal>
                            {/* banner_section_fourth_ends */}
                            {/* banner_section_fifth_starts */}
                            <View style={styles.header}>
                                <Text style={styles.title}>New Items</Text>
                                <TouchableOpacity style={styles.seeAllButton}>
                                    <Text style={styles.seeAllText}>See All</Text>
                                    <Text style={styles.arrow}>→</Text>
                                </TouchableOpacity>
                                <FlatList
                                    data={newItems}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (

                                        <View style={[styles.card, {
                                            width: screenWidth * 0.4,
                                        }]}>
                                            <Image source={{ uri: item.image }} style={styles.image} />
                                            <Text style={styles.description}>{item.description}</Text>
                                            <Text style={styles.price}>{item.price}</Text>
                                        </View>
                                    )}
                                    contentContainerStyle={styles.listContent}
                                />
                            </View>
                            {/* banner_section_fifth_ends */}
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
    recently_viewed_container: {
        marginVertical: verticalScale(20),
        marginRight: moderateScale(15),
    },
    recently_viewed: {
        color: "black",
        fontSize: scale(23),
        fontWeight: "bold"
    },
    recently_viewed_images_contianer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: verticalScale(20)
    },
    recently_viewed_images: {
        borderRadius: 50,
        width: scale(55),
        height: verticalScale(55),
        borderWidth: scale(6),
        borderColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    my_orders_container: {
        marginRight: moderateScale(15),
    },
    my_orders_container_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: verticalScale(20),

    },
    my_orders_container_text: {
        backgroundColor: "#E5EBFC",
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(14),
        width: "30%",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: moderateScale(15),
    },
    bannerSection: {
        padding: 16,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    storyCard: {
        position: 'relative',
        marginVertical: verticalScale(20),
        marginRight: scale(10),
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    liveBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'green',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        overflow: 'hidden',
    },
    playIconContainer: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        padding: 10,
    },
    playIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    videoPlayerContainer: {
        width: '100%',
        height: 300, // or any height you prefer
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: 'black', // Background for full screen
    },
    fullScreenVideo: {
        flex: 1,
    },
    videoThumbnail: {
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginRight: 4,
    },
    arrow: {
        fontSize: 18,
        color: '#007BFF',
    },
    listContent: {
        paddingLeft: 16,
    },
    card: {
        marginRight: 16,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        padding: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    description: {
        fontSize: 12,
        color: '#555',
        marginTop: 8,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
});

export default Dashboard;
