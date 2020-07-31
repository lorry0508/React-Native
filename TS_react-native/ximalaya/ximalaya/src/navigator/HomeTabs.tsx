import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import { StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';

type HomeParamList = {
    [key: string]: undefined;
}

const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = ({ category }: RootState) => {
    return {
        myCategorys: category.myCategorys
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState { }

class HomeTabs extends React.Component<IProps> {
    renderTabBar = (props: MaterialTopTabBarProps) => {
        return <TopTabBarWrapper {...props} />;
    }
    renderScreen = (item: ICategory) => {
        return (
            <Tab.Screen
                key={item.id}
                name={item.id}
                component={Home}
                options={{
                    tabBarLabel: item.name
                }}
            />
        );
    }
    render() {
        const { myCategorys } = this.props;
        return (
            <Tab.Navigator
                lazy // 对应标签下内容的懒加载, 等同于直接写一个lazy={true}
                tabBar={this.renderTabBar} // 自定义顶部标签栏
                sceneContainerStyle={styles.sceneContainer}
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
                {
                    myCategorys.map(this.renderScreen)
                }
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    sceneContainer: {
        backgroundColor: 'transparent'
    }
});

export default connector(HomeTabs);