import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'

type RootStackParamList = {
    Home: undefined;
    Detail: undefined;
}

let Stack = createStackNavigator<RootStackParamList>();

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerTitleAlign: 'center'
                    }}
                >
                    {/* options的优先级高于screenOptions */}
                    <Stack.Screen
                        name="Home" 
                        component={Home}
                        options={{
                            headerTitle: '首页'
                        }}
                    />
                    <Stack.Screen
                        name="Detail" 
                        component={Detail}
                        options={{
                            headerTitle: '详情页'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    };

}

export default Navigator;