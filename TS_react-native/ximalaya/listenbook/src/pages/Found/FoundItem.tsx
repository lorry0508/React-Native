import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-custom-controls';
import {IFound} from '@/models/found';

interface IProps {
  item: IFound;
  paused: boolean;
  setCurrentId: (id: string) => void;
}

class FoundItem extends React.PureComponent<IProps> {
  onPause = () => {
    const {setCurrentId} = this.props;
    setCurrentId('');
  };

  onPlay = () => {
    const {item, setCurrentId} = this.props;
    setCurrentId(item.id);
  };

  render() {
    const {item, paused} = this.props;
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <VideoPlayer
            paused={paused}
            source={{uri: item.videoUrl}}
            style={styles.video}
            onPause={this.onPause}
            onPlay={this.onPlay}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 5,
    borderColor: '#f3f4f5',
    paddingVertical: 10,
  },
  title: {
    marginBottom: 5,
  },
  video: {
    // width: '100%',
    height: 220,
  },
});

export default FoundItem;
