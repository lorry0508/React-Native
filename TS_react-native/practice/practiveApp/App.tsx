import React from 'react';
import {
	SafeAreaView,
	StatusBar,
	View, 
	Text
} from 'react-native';

import Config from 'react-native-config';

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View>
					<Text>{Config.API_URL}</Text>
				</View>
			</SafeAreaView>
		</>
	);
};

export default App;
