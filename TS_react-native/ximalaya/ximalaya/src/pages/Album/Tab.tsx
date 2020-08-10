import React from 'react';
import { StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';
import { PanGestureHandler, TapGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler';

interface IRoute {
    key: string;
    title: string;
}

interface IState {
    routes: IRoute[];
    index: number;
}

export interface ITabProps {
    panRef: React.RefObject<PanGestureHandler>;
    tapRef: React.RefObject<TapGestureHandler>;
    nativeRef: React.RefObject<NativeViewGestureHandler>;
    onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

class Tab extends React.Component<ITabProps, IState> {
    state = {
        routes: [
            { key: 'introduction', title: '简介' },
            { key: 'albums', title: '节目' }
        ],
        index: 1
    }
    onIndexChange = (index: number) => {
        this.setState({
            index
        })
    }
    renderScene = ({ route }: { route: IRoute }) => {
        const { panRef, tapRef, nativeRef, onScrollDrag } = this.props;
        switch (route.key) {
            case 'introduction':
                return <Introduction />;
            case 'albums':
                return <List panRef={panRef} tapRef={tapRef} nativeRef={nativeRef} onScrollDrag={onScrollDrag} />;
        }
    }
    renderTabBar = (props: SceneRendererProps & { navigationState: IState }) => {
        return (
            <TabBar
                {...props}
                scrollEnabled
                tabStyle={styles.tabStyle}
                labelStyle={styles.label}
                style={styles.tabbar}
                indicatorStyle={styles.indicator}
            />
        );
    }
    render() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={this.onIndexChange}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
            />
        );
    }
}

const styles = StyleSheet.create({
    tabStyle: {
        width: 80,
    },
    label: {
        color: '#333',
    },
    tabbar: {
        backgroundColor: '#fff',
        ...Platform.select({
            android: {
                elevation: 0,
                borderBottomColor: '#e3e3e3',
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
        }),
    },
    indicator: {
        backgroundColor: '#eb6d48',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderColor: '#fff',
    },
});

export default Tab;