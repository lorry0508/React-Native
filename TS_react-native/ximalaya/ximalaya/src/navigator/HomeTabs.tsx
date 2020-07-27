import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.Component {
    render() {
        return (
            <Tab.Navigator
                lazy={true} // 对应标签下内容的懒加载, 等同于直接写一个lazy
                tabBarOptions={{
                    scrollEnabled: true, // 顶部导航器菜单滑动设置
                    tabStyle: { // 单项所在宽度
                        width: 80
                    },
                    indicatorStyle: { // 选中横条的样式
                        height: 4,
                        width: 20,
                        marginLeft: 30,
                        borderRadius: 2,
                        backgroundColor: '#f86442',
                    },
                    activeTintColor: '#f86442', //选中字体颜色
                    inactiveTintColor: '#333', // 未选中字体颜色
                }}
            >
                <Tab.Screen
                    name='Home' 
                    component={Home}
                    options={{
                        tabBarLabel: '推荐'
                    }}
                />
            </Tab.Navigator>
        ); 
    }
}

export default HomeTabs;