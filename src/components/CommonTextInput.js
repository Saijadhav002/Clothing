// CommonTextInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, moderateScale } from 'react-native-size-matters';

const CommonTextInput = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    style,
    extraStyles,
    ...props
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry); // State for toggling password visibility

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, extraStyles]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={isPasswordVisible} // Use state to toggle visibility
                style={[styles.input, style]} // Combine styles
                placeholderTextColor="#A9A9A9" // Placeholder color
                {...props} // Spread additional props
            />
            {secureTextEntry && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                    <Icon
                        name={isPasswordVisible ? 'eye-off' : 'eye'} // Switch between eye and eye-off icons
                        size={scale(20)}
                        color="#A9A9A9"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align input and icon in a row
        borderRadius: scale(8),
        padding: moderateScale(2),
        width: "100%",
        backgroundColor: "#f5f5f5",
        alignItems: 'center', // Center vertically
    },
    input: {
        flex: 1, // Take up full width except for the icon
        fontSize: scale(16),
        color: '#000',
    },
    iconContainer: {
        paddingHorizontal: moderateScale(10),
    },
});

export default CommonTextInput;
