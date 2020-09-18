import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'; // ios 依赖项，用于处理ios的一些问题
import LinearAnimatedGradientTransition from 'react-native-linear-gradient';
import Touchable from '@/components/Touchable';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { getActiveRouteName } from '@/utils/index';

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
    const routeName = getActiveRouteName(props.state);
    const modelState = state[routeName];
    return {
        gradientVisible: modelState.gradientVisible,
        linearColors: modelState.carousels && modelState.carousels.length > 0
            ? (modelState.carousels[modelState.activeCarouselIndex].colors
                ? modelState.carousels[modelState.activeCarouselIndex].colors
                : undefined)
            : undefined,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
    goCategory = () => {
        const { navigation } = this.props;
        navigation.navigate("Category");
    }
    get linearGradient() {
        const { gradientVisible, linearColors = ['#ccc', '#e2e2e2'] } = this.props;
        if (gradientVisible) {
            return <LinearAnimatedGradientTransition colors={linearColors} style={styles.gradient} />;
        }
        return null;
    }
    render() {
        let { gradientVisible, indicatorStyle, ...restProps } = this.props;
        let textStyle = styles.text;
        let activeTintColor = '#333';
        if (gradientVisible) {
            textStyle = styles.witieText;
            activeTintColor = '#fff';
            if (indicatorStyle) {
                indicatorStyle = StyleSheet.compose(indicatorStyle, styles.witeBackgroundColor); // 合并两个样式
            }
        }
        return (
            <View style={styles.container}>
                {this.linearGradient}
                <View style={styles.topTabBarView}>
                    <MaterialTopTabBar {...restProps} activeTintColor={activeTintColor} indicatorStyle={indicatorStyle} style={styles.tabBar} />
                    <Touchable style={styles.categoryBtn} onPress={this.goCategory}>
                        <Text style={textStyle}>分类</Text>
                    </Touchable>
                </View>
                <View style={styles.bottom}>
                    <Touchable style={styles.searchBtn}>
                        <Text style={textStyle}>搜索按钮</Text>
                    </Touchable>
                    <Touchable style={styles.historyBtn}>
                        <Text style={textStyle}>历史记录</Text>
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
    gradient: {
        ...StyleSheet.absoluteFillObject,
        height: 260
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
    },
    text: {
        color: '#333'
    },
    witieText: {
        color: '#fff'
    },
    witeBackgroundColor: {
        backgroundColor: '#fff'
    }
});

export default connector(TopTabBarWrapper);