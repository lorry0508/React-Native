import React from 'react';
import { View, Text } from 'react-native';
import { IChannel } from '@/models/home';

interface IProps {
    data: IChannel;
}

class ChannelItem extends React.Component<IProps> {
    render() {
        return (
            <View>
                <Text>ChannelItem</Text>
            </View>
        );
    }
}

export default ChannelItem;