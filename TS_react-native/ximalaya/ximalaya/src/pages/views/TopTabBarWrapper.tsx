import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialTopTabBar, MaterialTopTabBarOptions } from '@react-navigation/material-top-tabs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'; // ios 依赖项，用于处理ios的一些问题

interface IProps extends MaterialTopTabBarOptions {

}
class TopTabBarWrapper extends React.Component<IProps> {
    render() {
        const { props } = this;
        return (
            <View style={styles.container}>
                <MaterialTopTabBar {...props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight()
    }
});

export default TopTabBarWrapper;