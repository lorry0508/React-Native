import React from 'react';
import { RouteProp, TabNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@/assets/iconfont'
import HomeTabs from './HomeTabs';
// import Home from './index';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import { RootStackNavigation, RootStackParamList } from '.';
import Play from '@/pages/views/Play';

export type BottomTabParamList = {
    HomeTabs: undefined;
    Listen: undefined;
    Play: undefined;
    Found: undefined;
    Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
    state?: TabNavigationState
}

interface IProps {
    navigation: RootStackNavigation;
    route: Route;
}

function getHeaderTitle(route: Route) {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || 'HomeTabs';
    switch (routeName) {
        case 'HomeTabs':
            return '首页';
        case 'Listen':
            return '我听';
        case 'Found':
            return '发现';
        case 'Account':
            return '账户';
        default:
            return '首页';
    }
}

class BottomTabs extends React.Component<IProps> {
    componentDidMount() {
        this.setOptions();
    }
    componentDidUpdate() {
        this.setOptions();
    }
    setOptions = () => {
        const { navigation, route } = this.props;
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || 'HomeTabs';
        if(routeName === 'HomeTabs') {
            navigation.setOptions({
                headerTransparent: true, // 控制顶部标题栏显示的效果
                headerTitle: '',
            });
        } else {
            navigation.setOptions({
                headerTransparent: false, // 控制顶部标题栏显示的效果
                headerTitle: getHeaderTitle(route),
            });
        }
    }
    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#f86442'
                }}
            >
                <Tab.Screen
                    name="HomeTabs"
                    component={HomeTabs}
                    options={{
                        tabBarLabel: '首页',
                        tabBarIcon: ({ color, size }) => <Icon name='icon-shouye' color={color} size={size} />
                    }}
                />
                <Tab.Screen
                    name="Listen"
                    component={Listen}
                    options={{
                        tabBarLabel: '我听',
                        tabBarIcon: ({ color, size }) => <Icon name='icon-shoucang' color={color} size={size} />
                    }}
                />
                <Tab.Screen 
                    name='Play'
                    component={Play}
                    options={{
                        tabBarButton: () => {
                            return <Play />
                        }
                    }}
                />
                <Tab.Screen
                    name="Found"
                    component={Found}
                    options={{
                        tabBarLabel: '发现',
                        tabBarIcon: ({ color, size }) => <Icon name='icon-faxian' color={color} size={size} />
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={Account}
                    options={{
                        tabBarLabel: '我的',
                        tabBarIcon: ({ color, size }) => <Icon name='icon-user' color={color} size={size} />
                    }}
                />
            </Tab.Navigator>
        );
    }
}

export default BottomTabs;