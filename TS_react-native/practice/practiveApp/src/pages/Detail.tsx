import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native'; // 进行路由跳转时进行参数传值
import { RootStackParamList } from '@/navigator/index';

interface IProps {
    route: RouteProp<RootStackParamList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
    render() {
        const { route } = this.props;
        return (
            <View>
                <Text>detail</Text>
                <Text>{route.params.id}</Text>
                {/* route.params */}
            </View>
        );
    }
}

export default Detail;