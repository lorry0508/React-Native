import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';

const mapStateToProps = ({ home }: RootState) => ({
    num: home.num
});
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;
interface IProps extends MadelState {
    navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
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
        const { num } = this.props;
        return (
            <View>
                <Text>Home{num}</Text>
                <Button title="加" onPress={this.handleAdd} />
                <Button title="异步加" onPress={this.asyncAdd} />
                <Button title="跳转到详情页" onPress={this.onPress} />
            </View>
        );
    }
}

export default connector(Home);