import React from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useHeaderHeight } from '@react-navigation/stack';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigator/index';
import coverRight from '@/assets/cover-right.png';
import Tab from './Tab';

const mapStateToProps = ({ album }: RootState) => {
    return {
        summary: album.summary,
        author: album.author
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    headerHeight: number;
    route: RouteProp<RootStackParamList, 'Album'>
}

class Album extends React.Component<IProps> {
    translateY = new Animated.Value(0); // 动画效果
    componentDidMount() {
        const { dispatch, route } = this.props;
        const { id } = route.params.item;
        dispatch({
            type: 'album/fetchAlbum',
            payload: {
                id,
            }
        });
        Animated.spring(this.translateY, {
            toValue: -170,
            tension: 100,
            friction: 10
        }).start()
    }
    renderHeader = () => {
        const { headerHeight, summary, author, route } = this.props;
        console.log(author, "")
        const { title, image } = route.params.item;
        return (
            <View style={[styles.header, { paddingTop: headerHeight }]}>
                <Image source={{ uri: image }} style={styles.background} />
                <BlurView blurType='light' blurAmount={10} style={StyleSheet.absoluteFillObject} />
                <View style={styles.leftView}>
                    <Image source={{ uri: image }} style={styles.thumbnail} />
                    <Image source={coverRight} style={styles.coverRight} />
                </View>
                <View style={styles.rightView}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.summary}>
                        <Text numberOfLines={1} style={styles.summaryText}>{summary}</Text>
                    </View>
                    <View style={styles.author}>
                        <Image source={{ uri: author.avatar }} style={styles.avatar} />
                        <Text style={styles.name}>{author.name}</Text>
                    </View>
                </View>
            </View>
        );
    }
    render() {
        return (
            <Animated.View style={[
                styles.container, {
                    padding: 10,
                    opacity: this.translateY.interpolate({
                        inputRange: [-170, 0],
                        outputRange: [1, 0]
                    }),
                    backgroundColor: this.translateY.interpolate({ 
                        inputRange: [-170, 0],
                        outputRange: ['red', '#fff']
                    }), 
                    transform: [{ translateY: this.translateY }] 
                }
            ]}>
                {this.renderHeader()}
                <Tab />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 260,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#eee'
    },
    leftView: {
        marginRight: 26
    },
    thumbnail: {
        width: 98,
        height: 98,
        borderColor: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    coverRight: {
        height: 98,
        position: 'absolute',
        right: -23,
        resizeMode: 'contain'
    },
    rightView: {
        flex: 1
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900'
    },
    /* 小贴士：View 组件中没有color属性，否则报错 */
    summary: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 10,
        marginVertical: 10,
        borderRadius: 4
    },
    summaryText: {
        color: '#fff'
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 26,
        height: 26,
        borderRadius: 13,
        marginRight: 8
    },
    name: {
        color: '#fff'
    }
});

function AlbumWrapper(props: IProps) {
    const headerHeight = useHeaderHeight();
    return <Album {...props} headerHeight={headerHeight} />;
}

export default connector(AlbumWrapper);


