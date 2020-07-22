import React from 'react';
import {View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont/Icon';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Progress from './Progress';

const mapStateToProps = ({player}: RootState) => {
  return {
    thumbnailUrl: player.thumbnailUrl,
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onPress: () => void;
}

class Play extends React.Component<IProps> {
  anim = new Animated.Value(0);
  rotate: Animated.AnimatedInterpolation;
  timing: Animated.CompositeAnimation;
  constructor(props: IProps) {
    super(props);
    this.timing = Animated.loop(
      Animated.timing(this.anim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {iterations: -1},
    );
    this.rotate = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  }
  componentDidMount() {
    const {playState} = this.props;
    if (playState === 'playing') {
      this.timing.start();
    }
  }
  componentDidUpdate() {
    const {playState} = this.props;
    if (playState === 'playing') {
      this.timing.start();
    } else if (playState === 'paused') {
      this.timing.stop();
    }
  }
  onPress = () => {
    const {onPress, thumbnailUrl} = this.props;
    if(thumbnailUrl && onPress) {
      onPress();
    }
  }
  render() {
    const {thumbnailUrl} = this.props;
    return (
      <Touchable style={styles.play} onPress={this.onPress}>
        <Progress>
          <Animated.View style={{transform: [{rotate: this.rotate}]}}>
            {thumbnailUrl ? (
              <Image source={{uri: thumbnailUrl}} style={styles.image} />
            ) : (
              <Icon name="icon-bofang3" color="#ededed" size={40} />
            )}
          </Animated.View>
        </Progress>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  play: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});

export default connector(Play);
