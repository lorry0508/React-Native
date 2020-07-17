/* 
    ref使用学习
*/
import React, { Component } from 'react';

import { Text, View } from 'react-native';

export default class RefTest extends Component {
    state = {
        size: 10
    }
    constructor(props) {
        super(props);
    }
    getSize() {
        return this.state.size;
    }
    render() {
        return (
            <Text style={{fontSize: 20, fontWeight: '700'}}>ref学习</Text>
        );
    }
}