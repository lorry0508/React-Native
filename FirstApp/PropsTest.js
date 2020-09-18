/* 
    props使用学习
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View
} from 'react-native';

export default class PropsTest extends Component {
    static defaultProps = { // 设置默认值
        name: '小明',
        age: 16
    }
    static propTypes = {
        name: PropTypes.string, // 类型检查
        age: PropTypes.number,
        sex: PropTypes.string.isRequired
    }
    render() {
        return (
            <View>
                <Text style={{fontSize: 20, backgroundColor: 'red'}}>姓名：{this.props.name}</Text>
                <Text style={{fontSize: 20, backgroundColor: 'red'}}>年龄：{this.props.age}</Text>
                <Text style={{fontSize: 20, backgroundColor: 'red'}}>性别：{this.props.sex}</Text>
            </View>
        )
    }
}