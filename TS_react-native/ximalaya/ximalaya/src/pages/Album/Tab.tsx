import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';

interface IRoute {
    key: string;
    title: string;
}

class Tab extends React.Component {
    state = {
        routes: [
            { key: 'introduction', title: '简介' },
            { key: 'albums', title: '节目' }
        ],
        index: 1
    }
    onIndexChange = (index: number) => {
        this.setState({
            index: index
        })
    }
    renderScene = ({route}: {route: IRoute}) => {
        switch(route.key) {
            case 'introduction': 
                return <Introduction />;
            case 'albums': 
                return <List />;
        }
    }
    render() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange = { this.onIndexChange }
                renderScene = { this.renderScene }
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