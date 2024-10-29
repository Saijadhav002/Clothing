import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import Video from 'react-native-video';

const VideoList = ({ videos }) => {
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleLongPress = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setIsFullScreen(false); // Ensure full-screen mode is off on long press
    };

    const handleVideoPress = () => {
        setIsFullScreen(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onLongPress={() => handleLongPress(item.videoUrl)} // Assuming each item has a `videoUrl`
            style={styles.itemContainer}
        >
            <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // Assuming each item has an id
            />

            {currentVideo && (
                <View style={styles.videoPlayerContainer}>
                    <Video
                        source={{ uri: currentVideo }}
                        style={styles.video}
                        controls={true}
                        resizeMode="contain"
                        onEnd={() => setCurrentVideo(null)}
                        onTouchEnd={handleVideoPress} // Handle video click to go full screen
                    />
                </View>
            )}

            {/* Full-screen modal */}
            <Modal
                visible={isFullScreen}
                animationType="slide"
                onRequestClose={() => setIsFullScreen(false)} // Close full-screen on back button
            >
                <View style={styles.fullScreenContainer}>
                    <Video
                        source={{ uri: currentVideo }}
                        style={styles.fullScreenVideo}
                        controls={true}
                        resizeMode="contain"
                        onEnd={() => {
                            setCurrentVideo(null);
                            setIsFullScreen(false); // Close full screen when video ends
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
    videoPlayerContainer: {
        height: 200, // Set a height for the inline video
        width: '100%',
    },
    video: {
        height: '100%',
        width: '100%',
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: 'black', // Background for full screen
    },
    fullScreenVideo: {
        flex: 1,
    },
});

export default VideoList;
