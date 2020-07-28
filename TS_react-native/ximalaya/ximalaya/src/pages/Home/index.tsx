import React from 'react';
import { ScrollView, FlatList, ListRenderItem, ListRenderItemInfo } from 'react-native';
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
    onPress = () => {
        const { navigation } = this.props;
        navigation.navigate('Detail', {
            id: 100
        });
    }
    handleAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'home/add',
            payload: {
                num: 10
            }
        });
    }
    asyncAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'home/asyncAdd',
            payload: {
                num: 2
            }
        });
    }
    renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
        return <ChannelItem data={item} />;
    }
    render() {
        const { carousels, channels } = this.props;
        return (
            <ScrollView>
                <Carousel data={carousels} />
                <Guess />
                <FlatList 
                    data={channels}
                    renderItem={this.renderItem}
                />
            </ScrollView>
        );
    }
}

export default connector(Home);