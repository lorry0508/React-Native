import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators, StackNavigationProp } from '@react-navigation/stack';
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

export type RootStackParamList = {
    Home: undefined;
    Detail: {
        id: number
    };
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

let Stack = createStackNavigator<RootStackParamList>();

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    headerMode='float'
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 标题动画效果
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 内容动画效果
                        gestureEnabled: true, // 手势默认是关闭的，设置为开启
                        gestureDirection: 'horizontal', // 手势方向默认为垂直方向，设置为左右方向
                        headerStyle: { // 标题栏样式
                            ...Platform.select({
                                android: {
                                    elevation: 0,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                },
                                ios: {

                                }
                            })
                        }
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