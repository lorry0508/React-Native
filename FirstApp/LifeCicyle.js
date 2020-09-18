import React, { Component } from 'react';

import {
    Text, View
} from 'react-native';

export default class LifeCicyle extends Component {
    constructor(props) {
        super(props);
        console.log('------constructor-----');
        this.state = {
            count: 0
        }
    }
    // 组件装载之前调用 unsafe
    // componentWillMount() {
    //     console.log('------componentWillMount-----');
    // }
    // 组件装载之后调用
    componentDidMount() {
        console.log('------componentDidMount-----');
    }
    // 在组件接收到新的props时调用 unsafe
    // componentWillReceiveProps(nextProps) {
    //     console.log('------componentWillReceiveProps-----');
    // }
    // 组件要不要更新时调用
    shouldComponentUpdate(nextProps, nextState) {
        console.log('------shouldComponentUpdate-----');
        return true;
    }
    // 组件在更新之前调用 unsafe
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('------componentWillUpdate-----');
    // }
    // 组件被更新之后调用的方法
    componentDidUpdate(nextProps, nextState) {
        console.log('------componentDidUpdate-----');
    }
    // 组件被移除之前调用的方法 unsafe
    componentWillUnmount() {
        console.log('------componentWillUnmount-----');
    }

    render() {
        console.log('------render-----');
        return (
            <View>
                <Text 
                    style={{height: 50, lineHeight: 50, textAlign: 'center', fontSize: 20, backgroundColor: 'red'}}
                    onPress={
                        ()=> {
                            this.setState({
                                count: this.state.count+1
                            })
                        }
                    }>
                        有本事你打我呀！
                </Text>
                <Text 
                    style={{fontSize: 20}}>
                    {this.props.name}被打了{this.state.count}次
                </Text>
            </View>
        );
    }
};