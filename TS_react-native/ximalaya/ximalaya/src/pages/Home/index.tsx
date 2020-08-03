import React from 'react';
import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import Carousel, { sideHeight } from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import { IChannel, IGuess } from '@/models/home';
import { RouteProp } from '@react-navigation/native';
import { HomeParamList } from '@/navigator/HomeTabs';

const mapStateToProps = (state: RootState, { route }: { route: RouteProp<HomeParamList, string> }) => {
    const { namespace } = route.params;
    const modelState = state[namespace];
    return {
        namespace,
        carousels: modelState.carousels,
        gradientVisible: modelState.gradientVisible,
        channels: modelState.channels,
        hasMore: modelState.pagination.hasMore,
        loading: state.loading.effects[namespace + '/fecthChannels']
    };
}
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;
interface IProps extends MadelState {
    navigation: RootStackNavigation;
}

interface IState {
    refreshing: boolean;
}

class Home extends React.PureComponent<IProps, IState> {
    state = {
        refreshing: false
    }
    componentDidMount() {
        const { dispatch, namespace } = this.props;
        dispatch({
            type: namespace + '/fetchCarousels'
        });
        dispatch({
            type: namespace + '/fecthChannels'
        });
    };
    goAlbum = (data: IChannel | IGuess) => {
        const { navigation } = this.props;
        navigation.navigate('Album', {item: data});
    }
    keyExtractor = (item: IChannel) => {
        return item.id;
    }
    // 加载更多
    onEndReached = () => {
        const { dispatch, namespace } = this.props;
        dispatch({
            type: namespace + '/fecthChannels',
            payload: {
                loadMore: true
            }
        });
    }
    // 下拉刷新
    onRefresh = () => {
        // 1.修改刷新状态为true
        this.setState({
            refreshing: true
        })
        // 2.获取数据
        const { dispatch, namespace } = this.props;
        dispatch({
            type: namespace + '/fecthChannels',
            callback: () => {
                // 3.修改刷新状态为false
                this.setState({
                    refreshing: false
                })
            }
        });
    }
    renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
        return <ChannelItem data={item} onPress={this.goAlbum} />;
    }
    onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = nativeEvent.contentOffset.y;
        let newGradientVisible = offsetY < sideHeight;
        const { dispatch, namespace, gradientVisible } = this.props;
        if (gradientVisible !== newGradientVisible) {
            dispatch({
                type: namespace + '/setState',
                payload: {
                    gradientVisible: newGradientVisible,
                }
            })
        }
    }
    get header() {
        const { loading, hasMore, namespace } = this.props;
        if (loading || !hasMore) return;
        return (
            <View>
                <Carousel />
                <View style={styles.background}>
                    <Guess namespace={namespace} goAlbum={this.goAlbum} />
                </View>
            </View>
        );
    }
    get footer() {
        const { hasMore, loading, channels } = this.props;
        if (!hasMore) {
            return (
                <View style={styles.end}>
                    <Text>--我是有底线的--</Text>
                </View>
            );
        }
        if (loading && hasMore && channels.length > 0) {
            return (
                <View style={styles.loading}>
                    <Text>正在加载中。。。</Text>
                </View>
            );
        }
    }
    get empty() {
        const { loading } = this.props;
        if (loading) return;
        return (
            <View style={styles.empty}>
                <Text>暂无数据</Text>
            </View>
        );
    }
    render() {
        const { channels } = this.props;
        const { refreshing } = this.state;
        return (
            // 贴士： 不能直接将FlatList 直接放到ScrollView里面去
            // <ScrollView></ScrollView>
            <FlatList
                ListHeaderComponent={this.header}
                ListFooterComponent={this.footer}
                ListEmptyComponent={this.empty}
                data={channels}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor} // 优化作用,取出key
                onRefresh={this.onRefresh} // 下拉刷新, 而且不能单独使用
                refreshing={refreshing}
                onEndReached={this.onEndReached} // 上拉加载更多
                onEndReachedThreshold={0.2} // 距离底部多选距离比例时触发
                onScroll={this.onScroll}
            />
        );
    }
}

const styles = StyleSheet.create({
    end: {
        alignItems: 'center',
        paddingVertical: 10
    },
    loading: {
        alignItems: 'center',
        paddingVertical: 10
    },
    empty: {
        alignItems: 'center',
        paddingVertical: 100
    },
    background: {
        backgroundColor: '#fff',

    }
});

export default connector(Home);