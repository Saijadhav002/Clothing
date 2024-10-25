import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false); // State for loading

    const signOut = async () => {
        setLoading(true); // Set loading to true before sign out
        try {
            await auth().signOut();
            console.log('User signed out!');
            navigation.navigate("OnBoarding");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false after sign out
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator
            ) : (
                <>
                    <Text style={styles.text}>Dashboard</Text>
                    <Button title="Exit" onPress={signOut} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Dashboard;
