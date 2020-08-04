import React from 'react';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';
import { StyleSheet, Platform } from 'react-native';

interface IRoute {
    key: string;
    title: string;
}

interface IState {
    routes: IRoute[];
    index: number;
}

interface IProps {}

class Tab extends React.Component<IProps, IState> {
    state = {
        routes: [
            { key: 'introduction', title: '简介' },
            { key: 'album', title: '节目' }
        ],
        index: 1
    }
    onIndexChange = (index: number) => {
        this.setState({
            index
        })
    };
    renderScene = ({ route }: { route: IRoute }) => {
        switch (route.key) {
            case 'introduction':
                return <Introduction />;
            case 'album':
                return <List />
        }
    };
    renderTabBar = (props: SceneRendererProps & { navigationState: IState}) => {
        return <TabBar 
                    {...props} 
                    scrollEnabled 
                    tabStyle={styles.tabStyle} 
                    labelStyle={styles.labelStyle} 
                    style={styles.tabbar}
                    indicatorStyle={styles.indicatorStyle}
                />
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
        width: 80
    },
    labelStyle: {
        color: '#000'
    },
    tabbar: {
        backgroundColor: '#fff',
        ...Platform.select({
            android: {
                elevation: 0,
                borderBottomColor: '#e3e3e3',
                borderBottomWidth: StyleSheet.hairlineWidth
            }
        })
    },
    indicatorStyle: {
        backgroundColor: '#eb6d48',
        borderLeftWidth:  20,
        borderRightWidth: 20,
        borderColor: '#fff',
    }
});

export default Tab;