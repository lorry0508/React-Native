import React from 'react';
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
            { key: 'album', title: '节目' }
        ],
        index: 1
    }
    onIndexChange = (index: number) => {
        this.setState({
            index
        })
    }
    renderScene = ({ route }: { route: IRoute }) => {
        switch (route.key) {
            case 'introduction':
                return <Introduction />;
            case 'album': 
                return <List />
        }
    }
    render() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={this.onIndexChange}
                renderScene={this.renderScene}
            />
        );
    }
}

export default Tab;