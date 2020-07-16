/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
	Text, View
} from 'react-native'; 

import HelloComponents from './HelloComponents';
import LifeCicyle from './LifeCicyle';
import EIComponent, { name, age, add } from './EIComponent';
import PropsTest from './PropsTest';

import {
	// 
} from 'react-native/Libraries/NewAppScreen';

/* 官方脚手架默认写法 */
// const App: () => React$Node = () => {
// 	return (
// 		<>
// 			<View>
// 				{/* <HelloComponents name="小明" /> */}
// 				<LifeCicyle name="小罗" />
// 			</View>
// 		</>
// 	);
// };

// export default App;

/* es6写法 推荐  */
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			remove: false,
			result: 0
		}
	}
	render() {
		var view = this.state.remove ? null : <LifeCicyle name="小罗" />;
		var text = this.state.remove ? '让他复活' : '干掉他';
		return (
			<View>
				{/* <HelloComponents name="小明" /> */}
				<Text
					style={{fontSize: 20}}
					onPress={
						()=> {
							this.setState({
								remove: !this.state.remove
							})
						}
					}>
						{text}
				</Text>
				{view}
				<EIComponent name="react-native" />
				<Text style={{fontSize: 20}}>姓名：{name}</Text>
				<Text style={{fontSize: 20}}>年龄：{age}</Text>
				<Text style={{fontSize: 20}}
					onPress={()=> {
						var result = add(2, 3);
						this.setState({
							result: result
						});
					}}>
						2 + 3 = { this.state.result }
				</Text>
				<PropsTest name="props学习" />
			</View>
		);
	}
}
