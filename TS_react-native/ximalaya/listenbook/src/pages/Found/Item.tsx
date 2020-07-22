import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VideoControls from 'react-native-video-custom-controls';
import {IFound} from '@/models/found';

interface IProps {
  data: IFound;
  paused: boolean;
  setCurrentId: (id: string) => void;
}

class Item extends React.Component<IProps> {
  onPlay = () => {
    const {data, setCurrentId} = this.props;
    setCurrentId(data.id);
  };
  onPause = () => {
    const {setCurrentId} = this.props;
    setCurrentId('');
  };
  render() {
    const {data, paused} = this.props;
    return (
      <View>
        <Text>{data.title}</Text>
        <VideoControls
          onPlay={this.onPlay}
          onPause={this.onPause}
          paused={paused}
          source={{uri: data.videoUrl}}
          style={styles.video}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    height: 220,
  },
});

export default Item;
