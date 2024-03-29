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
	}
	render() {
		return (
			<View>
				<Text>123</Text>
			</View>
		);
	}
}
