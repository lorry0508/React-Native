import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'; // ios 依赖项，用于处理ios的一些问题
import Touchable from '@/components/Touchable';

interface IProps extends MaterialTopTabBarProps {

}
class TopTabBarWrapper extends React.Component<IProps> {
    render() {
        const { props } = this;
        return (
            <View style={styles.container}>
                <View style={styles.topTabBarView}>
                    <MaterialTopTabBar {...props} style={styles.tabBar} />
                    <Touchable style={styles.categoryBtn}>
                        <Text>分类</Text>
                    </Touchable>
                </View>
                <View style={styles.bottom}>
                    <Touchable style={styles.searchBtn}>
                        <Text>搜索按钮</Text>
                    </Touchable>
                    <Touchable style={styles.historyBtn}>
                        <Text>历史记录</Text>
                    </Touchable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: getStatusBarHeight()
    },
    topTabBarView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabBar: {
        flex: 1,
        elevation: 0,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    categoryBtn: {
        paddingHorizontal: 10,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: '#ccc'
    },
    bottom: {
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    searchBtn: {
        flex: 1,
        paddingLeft: 12,
        height: 30,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    historyBtn: {
        marginLeft: 24
    }
});

export default TopTabBarWrapper;