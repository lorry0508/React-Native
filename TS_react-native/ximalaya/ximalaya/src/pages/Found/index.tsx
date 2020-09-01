import React from 'react';
import {
    ListRenderItemInfo
} from 'react-native';
import { RootStackNavigation } from '@/navigator/index';
import { connect, ConnectedProps } from 'react-redux';
import { IFound } from '@/models/found';
import { FlatList } from 'react-native-gesture-handler';
import Item from './Item';

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

interface IState {
    list: IFound[];
}

class Found extends React.Component<IProps, IState> {
    state = {
        list: []
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'found/fetchList',
            callback: (data: IFound[]) => {
                this.setState({
                    list: data
                })
            }
        })
    }
    renderItem = ({ item }: ListRenderItemInfo<IFound>) => {
        return <Item data={item} />
    }
    render() {
        const { list } = this.state;
        return (
            <FlatList
                data={list}
                renderItem={this.renderItem}
            />
        );
    }
}

export default connector(Found);