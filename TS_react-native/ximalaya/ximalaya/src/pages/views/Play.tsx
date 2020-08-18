import React from 'react';
import { StyleSheet, Image, Animated, Easing } from 'react-native';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = ({ player }: RootState) => {
    return {
        thumbnailUrl: player.thumbnailUrl,
        playState: player.playState
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {

}

class Play extends React.Component<IProps> {
    anim = new Animated.Value(0);
    rotate: Animated.AnimatedInterpolation;
    constructor(props: IProps) {
        super(props);
        Animated.timing(this.anim, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true
        });
        this.rotate = this.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
    }
    render() {
        const { thumbnailUrl } = this.props;
        return (
            <Touchable style={styles.play}>
                {
                    thumbnailUrl ? <Animated.Image source={{ uri: thumbnailUrl }} style={[styles.image, { transform: [{ rotate: this.rotate }] }]} /> : <Icon name='icon-bofang3' color='#ededed' size={40} />
                }
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    play: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    image: {
        width: 42,
        height: 42,
        borderRadius: 21,
    }
});

export default connector(Play);