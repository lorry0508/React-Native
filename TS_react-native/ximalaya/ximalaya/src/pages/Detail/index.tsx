import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { ModalStackParamList } from '@/navigator/index';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '@/models/index';
import { ConnectedProps, connect } from 'react-redux';

const mapStateToProps = ({ player }: RootState) => {
    return {
        soundUrl: player.soundUrl
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<ModalStackParamList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
    componentDidMount() {
        const { dispatch, route } = this.props;
        dispatch({
            type: 'player/fetchShow',
            payload: {
                id: route.params.id
            }
        })
    }

    render() {
        return (
            <View>
                <Text>Detail</Text>
            </View>
        );
    }
}

export default connector(Detail);