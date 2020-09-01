import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VideoControls from 'react-native-video-custom-controls';
import { IFound } from '@/models/found';

interface IProps {
    data: IFound;
}

class Item extends React.Component<IProps> {
    render() {
        const { data } = this.props;
        return (
            <View>
                <Text>{data.title}</Text>
                <VideoControls
                    paused
                    source={{uri: data.videoUrl}}
                    style={styles.video}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    video: {
        height: 220
    }
});

export default Item;