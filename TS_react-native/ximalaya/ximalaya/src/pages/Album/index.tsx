import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useHeaderHeight } from '@react-navigation/stack';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigator/index';
import coverRight from '@/assets/cover-right.png';
import Tab from '@/pages/Album/Tab';

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

const HEADER_HEIGHT = 260;

class Album extends React.Component<IProps> {
    componentDidMount() {
        const { dispatch, route } = this.props;
        const { id } = route.params.item;
        dispatch({
            type: 'album/fetchAlbum',
            payload: {
                id,
            }
        });
    }
    renderHeader = () => {
        const { headerHeight, summary, author, route } = this.props;
        const { title, image } = route.params.item;
        return (
            <View style={[styles.header, { paddingTop: headerHeight }]}>
                <Image source={{ uri: image }} style={styles.background} />
                <BlurView
                    blurType="light"
                    blurAmount={10}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.leftView}>
                    <Image source={{ uri: image }} style={styles.thumbnail} />
                    <Image source={coverRight} style={styles.coverRight} />
                </View>
                <View style={styles.rightView}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.summary}>
                        <Text numberOfLines={1} style={styles.summaryText}>
                            {summary}
                        </Text>
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
        const { headerHeight, summary, author, route } = this.props;
        const { title, image } = route.params.item;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <Tab />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#eee',
    },
    leftView: {
        marginRight: 26,
    },
    thumbnail: {
        width: 98,
        height: 98,
        borderColor: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    coverRight: {
        height: 98,
        position: 'absolute',
        right: -23,
        resizeMode: 'contain',
    },
    rightView: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },
    summary: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 10,
        marginVertical: 10,
        borderRadius: 4,
    },
    summaryText: {
        color: '#fff',
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 26,
        width: 26,
        borderRadius: 13,
        marginRight: 8,
    },
    name: {
        color: '#fff',
    },
});

function AlbumWrapper(props: IProps) {
    const headerHeight = useHeaderHeight();
    return <Album {...props} headerHeight={headerHeight} />;
}

export default connector(AlbumWrapper);