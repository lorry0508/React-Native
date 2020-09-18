/* 
    组件导入导出学习
*/
import React, { Component } from 'react';

import {
    Text, View
} from 'react-native';

/* 
    方式一: es6导出
*/
// export default class EIComponent extends Component {
//     render() {
//         return (
//             <Text style={{fontSize: 20, backgroundColor: 'red'}}>Hello,{this.props.name}</Text>
//         );
//     }
// }

/* 
    方式二： es5导出
*/
// var EIComponent = React.createClass({
//     render() {
//         return (
//             <Text style={{fontSize: 20, backgroundColor: 'red'}}>Hello,{this.props.name}</Text>
//         );
//     }
// });

// module.exports = EIComponent;


/* 
    导出变量或常量
*/
// export var name = '小明';  // 导出1个
const name = '小明';
var age = 22;

export { // 导出多个
    name,
    age
};
export default class EIComponent extends Component {
    render() {
        return (
            <Text style={{fontSize: 20, backgroundColor: 'red'}}>Hello,{this.props.name}</Text>
        );
    }
}


/* 
    导出方法
*/
export function add(a, b) {
    return a + b;
}