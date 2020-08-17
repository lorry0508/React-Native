import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import { ModalStackParamList, ModalStackNavigation } from '@/navigator/index';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '@/models/index';
import { ConnectedProps, connect } from 'react-redux';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont';
import PlayerSlider from './PlayerSlider';
import { viewportWidth } from '@/utils/index';
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = ({ player }: RootState) => {
    return {
        soundUrl: player.soundUrl,
        playState: player.playState,
        title: player.title,
        thumbnailUrl: player.thumbnailUrl,
        previousId: player.previousId,
        nextId: player.nextId
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: ModalStackNavigation;
    route: RouteProp<ModalStackParamList, 'Detail'>;
}

interface IState {
    barrage: boolean
}

const IMAGE_WIDTH = 180;

const SCALE = viewportWidth / IMAGE_WIDTH;

class Detail extends React.Component<IProps, IState> {
    state = {
        barrage: false
    }
    anim = new Animated.Value(1);
    componentDidMount() {
        const { dispatch, route, navigation, title } = this.props;
        dispatch({
            type: 'player/fetchShow',
            payload: {
                id: route.params.id
            }
        });
        navigation.setOptions({
            headerTitle: title
        });
    }
    componentDidUpdate(prevProps: IProps) {
        if (this.props.title !== prevProps.title) {
            this.props.navigation.setOptions({
                headerTitle: this.props.title
            })
        }
    }
    toggle = () => {
        const { dispatch, playState } = this.props;
        dispatch({
            type: playState === 'playing' ? 'player/pause' : 'player/play'
        });
    }
    previous = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'player/previous'
        })
    }
    next = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'player/next'
        })
    }
    barrage = () => {
        this.setState({
            barrage: !this.state.barrage
        })
        Animated.timing(this.anim, {
            toValue: this.state.barrage ? 1 : SCALE,
            useNativeDriver: true,
            duration: 100,
        }).start();
    }
    render() {
        const { barrage } = this.state;
        const { playState, previousId, nextId, thumbnailUrl } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.imageView}>
                    <Animated.Image source={{ uri: thumbnailUrl }} style={[styles.image, { transform: [{ scale: this.anim }] }]} />
                </View>
                {
                    barrage && (
                        <LinearGradient colors={['rgba(128, 104, 102, 0.5)', '#807c66']} style={styles.linear} />
                    )
                }
                <Touchable style={styles.barrageBtn} onPress={this.barrage}>
                    <Text style={styles.barrageText}>弹幕</Text>
                </Touchable>
                <PlayerSlider />
                <View style={styles.control}>
                    <Touchable disabled={!previousId} onPress={this.previous} style={styles.button}>
                        <Icon name='icon-shangyishou' size={30} color='#fff' />
                    </Touchable>
                    <Touchable onPress={this.toggle} style={styles.button}>
                        <Icon name={playState === 'playing' ? 'icon-paste' : 'icon-bofang'} size={40} color='#fff' />
                    </Touchable>
                    <Touchable disabled={!nextId} onPress={this.next} style={styles.button}>
                        <Icon name='icon-xiayishou' size={30} color='#fff' />
                    </Touchable>
                </View>
            </View>
        );
    }
}

const PADDING_TOP = (viewportWidth - IMAGE_WIDTH) / 2;

const styles = StyleSheet.create({
    container: {
        paddingTop: PADDING_TOP,
    },
    control: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 90,
    },
    button: {
        marginHorizontal: 10,
    },
    imageView: {
        alignItems: 'center',
        height: IMAGE_WIDTH,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH,
        borderRadius: 8,
        backgroundColor: '#ccc',
    },
    barrageBtn: {
        height: 20,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
        marginLeft: 10,
    },
    barrageText: {
        color: '#fff',
    },
    linear: {
        position: 'absolute',
        top: 0,
        height: viewportWidth,
        width: viewportWidth,
    },
});

export default connector(Detail);