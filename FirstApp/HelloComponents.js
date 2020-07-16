import React, { Component } from 'react';

import {
    Text
} from 'react-native';

/* 
    方式1: es6方式
    推荐使用方式
*/
export default class HelloComponent extends Component {
    render() {
    return <Text style={{fontSize: 20, backgroundColor: 'red'}}>Hello{this.props.name}</Text>;
    }
};

/* 
    方式2: es5方式
*/
// var HelloComponent = React.createClass({
//     render() {
//         return <Text style={{fontSize: 20, backgroundColor: 'red'}}>Hello Luorui</Text>;
//     }
// });

// module.exports = HelloComponent;

/* 
    方式3: 函数式
    无状态，无法使用this
*/
// function HelloComponent(props) {
//     return <Text style={{fontSize: 20, backgroundColor: 'red'}}>Hello{props.name}</Text>;
// }

// module.exports = HelloComponent;