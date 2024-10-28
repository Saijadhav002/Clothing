// components/Footer.js

import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';



const Footer = ({ navigation }) => {
    const navbarIcons = [
        {
            id: 0,
            src: "home",
            screen: "VouchersScreen" // Replace with your actual screen name
        },
        {
            id: 1,
            src: "heart",
            screen: "TopMenuScreen" // Replace with your actual screen name
        },
        {
            id: 2,
            src: "book",
            screen: "SettingsScreen" // Replace with your actual screen name
        },
        {
            id: 3,
            src: "shopping-bag",
            screen: "SettingsScreen" // Replace with your actual screen name
        },
        {
            id: 4,
            src: "user",
            screen: "SettingsScreen" // Replace with your actual screen name
        }
    ];

    const handleIconPress = (screen) => {
        navigation.navigate(screen);
    };

    return (
        // <View style={styles.footerContainer}>
        <LinearGradient
            colors={['#F6F7ED', '#CDEDF8', '#F5C8F1']}
            start={{ x: 0, y: 0.9 }}
            end={{ x: 1, y: 1 }}
            style={styles.footerContainer}
        >
            {navbarIcons.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handleIconPress(item.screen)}
                    style={styles.iconContainer}
                >

                    <Icon name={item.src} color="" size={19} style={styles.footerIcon} />

                </TouchableOpacity>
            ))}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent', // Change to your desired background color
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
    },
    footerIcon: {
        width: 30, // Change to your desired icon size
        height: 30,
        color: "blue"
    },
});

export default Footer;
