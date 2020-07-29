import React from 'react';
import { View, Text, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import Carousel from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import { IChannel } from '@/models/home';

const mapStateToProps = ({ home, loading }: RootState) => ({
    carousels: home.carousels,
    channels: home.channels,
    hasMore: home.pagination.hasMore,
    loading: loading.effects['home/fecthChannels']
});
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;
interface IProps extends MadelState {
    navigation: RootStackNavigation;
}

interface IState {
    refreshing: boolean;
}

class Home extends React.Component<IProps, IState> {
    state = {
        refreshing: false
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'home/fetchCarousels'
        });
        dispatch({
            type: 'home/fecthChannels'
        });
    };
    onPress = (data: IChannel) => {
        console.log(data);
    }
    keyExtractor = (item: IChannel) => {
        return item.id;
    }
    // 加载更多
    onEndReached = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'home/fecthChannels',
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
        const { dispatch } = this.props;
        dispatch({
            type: 'home/fecthChannels',
            callback: () => {
                // 3.修改刷新状态为false
                this.setState({
                    refreshing: false
                })
            }
        });
    }
    renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
        return <ChannelItem data={item} onPress={this.onPress} />;
    }
    get header() {
        const { loading, hasMore } = this.props;
        if (loading || !hasMore) return;
        return (
            <View>
                <Carousel />
                <Guess />
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
        if(loading) return;
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
                onEndReached={this.onEndReached} // 上拉加载更多
                onEndReachedThreshold={0.2} // 距离底部多选距离比例时触发
                onRefresh={this.onRefresh} // 下拉刷新, 而且不能单独使用
                refreshing={refreshing}
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
    }
});

export default connector(Home);