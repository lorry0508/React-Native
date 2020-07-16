/* 
    props使用学习
*/
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

export default class PropsTest extends Component {
    static defaultProps = {
        name: '小明'
    }
    render() {
        return <Text style={{fontSize: 20, backgroundColor: 'red'}}>{this.props.name}</Text>;
    }
}