/* 
    states使用学习
*/
import React, { Component } from 'react';

import { Text, View } from 'react-native';

export default class StateTest extends Component {
    state = {
        size: 10
    }
    constructor(props) {
        super(props);
        // this.state = {
        //     size: 80
        // }
    }
    render() {
        return (
            <View>
                <Text style={{fontSize: this.state.size}}>点击放大的内容</Text>
                <Text 
                    onPress={()=> {
                        this.setState({
                            size: this.state.size + 10
                        })
                    }}>
                        点击放大！
                </Text>
                <Text 
                    onPress={()=> {
                        this.setState({
                            size: this.state.size - 10
                        })
                    }}>
                        点击缩小！
                </Text>
            </View>
        );
    }
}