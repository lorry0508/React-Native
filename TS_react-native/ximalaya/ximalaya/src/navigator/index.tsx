import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
// import Home from '@/pages/Home';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import Detail from '@/pages/Detail';
import { Platform, StyleSheet, StatusBar, Animated } from 'react-native';
import Icon from '@/assets/iconfont'

export type RootStackParamList = {
    BottomTabs: {
        screen?: string
    };
    Category: undefined;
    Album: {
        item: {
            id: string;
            title: string;
            image: string;
        },
        opacity?: Animated.Value;
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

function getAlbumOptions({ route }: { route: RouteProp<RootStackParamList, 'Album'> }) {
    return {
        headerTitle: route.params.item.title,
        headerTransparent: true,
        headerTitleStyle: {
            opacity: route.params.opacity
        },
        headerBackground: () => {
            return (
                <Animated.View style={[styles.headerBackground, { opacity: route.params.opacity }]} />
            );
        }
    };
}

function RootStackScreen() {
    return (
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
                name="Album"
                component={Album}
                options={getAlbumOptions}
            />
        </Stack.Navigator>
    );
}

export type ModalStackParamList = {
    Root: undefined;
    Detail: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamList>();

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

function ModalStackScreen() {
    return (
        <ModalStack.Navigator
            mode='modal'
            headerMode='screen'
            screenOptions={{
                headerTitleAlign: 'center',
                gestureEnabled: true,
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerBackTitleVisible: false
            }}
        >
            <ModalStack.Screen 
                name='Root' 
                component={RootStackScreen} 
                options={{ headerShown: false }} 
            />
            <ModalStack.Screen 
                name='Detail' 
                component={Detail} 
                options={{
                    headerTintColor: '#fff',
                    headerTitle: '',
                    headerTransparent: true,
                    cardStyle: {
                        backgroundColor: '#807c66'
                    },
                    headerBackImage: (({tintColor}) => <Icon name='icon-down' size={30} color={tintColor} style={styles.headerBackImage} />)
                }}
            />
        </ModalStack.Navigator>
    );
}

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <ModalStackScreen />
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        flex: 1,
        backgroundColor: '#fff',
        opacity: 0
    },
    headerBackImage: {
        marginHorizontal: Platform.OS === 'android' ? 0 : 8,
    }
});

export default Navigator;