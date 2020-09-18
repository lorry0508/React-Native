import React from 'react';
import { StatusBar, View } from 'react-native';
import Test from '@/pages/test';

export default class extends React.Component {
    render() {
        return (
            // <StatusBar // 显示有信号的状态栏
            //     backgroundColor="transparent"
            //     barStyle="dark-content"
            //     translucent
            // />
            <View>
                <Test />
            </View>
        );
    }
}

