import React from 'react';
import { ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import Carousel from './Carousel';
import Guess from './Guess';

const mapStateToProps = ({ home, loading }: RootState) => ({
    carousels: home.carousels,
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
            type: 'home/fetchCarousels',
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
    render() {
        const { carousels } = this.props;
        return (
            <ScrollView>
                <Carousel data={carousels} />
                <Guess />
            </ScrollView>
        );
    }
}

export default connector(Home);