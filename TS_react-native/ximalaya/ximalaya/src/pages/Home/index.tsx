import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
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
    loading: loading.effects['home/asyncAdd']
});
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;
interface IProps extends MadelState {
    navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
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
    renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
        return <ChannelItem data={item} onPress={this.onPress} />;
    }
    get header() {
        const { carousels } = this.props;
        return (
            <View>
                <Carousel data={carousels} />
                <Guess />
            </View>
        );
    }
    render() {
        const { channels } = this.props;
        return (
            <FlatList 
                ListHeaderComponent={this.header}
                data={channels}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor} // 优化作用,取出key
            />
            // 贴士： 不能直接将FlatList 直接放到ScrollView里面去
            // <ScrollView>
                
            // </ScrollView>
        );
    }
}

export default connector(Home);