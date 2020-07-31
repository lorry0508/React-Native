import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';
// import Home from '@/pages/Home';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Detail from '@/pages/Detail';
import { Platform, StyleSheet, StatusBar } from 'react-native';

export type RootStackParamList = {
    BottomTabs: {
        screen?: string
    };
    Category: undefined;
    Detail: {
        id: number
    };
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

let Stack = createStackNavigator<RootStackParamList>();
/* 
    {
        Navigator,
        Screen
    }
*/

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    headerMode="float"
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 标题动画效果
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 内容动画效果
                        gestureEnabled: true, // 默认手势是关闭的，设置为开启
                        gestureDirection: 'horizontal', // 默认手势方向为垂直方向，改为竖直方向
                        ...Platform.select({
                            android: {
                                headerStatusBarHeight: StatusBar.currentHeight,
                            }
                        }),
                        headerBackTitleVisible: false,
                        headerTintColor: '#333',
                        headerStyle: { // 标题栏样式
                            // backgroundColor: 'red',
                            ...Platform.select({ // 平台的选择
                                android: {
                                    elevation: 0,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                },
                                // ios: {

                                // }
                            })
                        }
                    }}
                >
                    {/* screenOptions 和 options 效果一样, 二选一使用就行， options层级更高 */}
                    <Stack.Screen
                        name="BottomTabs"
                        component={BottomTabs}
                        options={{
                            headerTitle: '首页'
                        }}
                    />
                    <Stack.Screen
                        name="Category"
                        component={Category}
                        options={{
                            headerTitle: '分类'
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
        );
    }
}

export default Navigator;