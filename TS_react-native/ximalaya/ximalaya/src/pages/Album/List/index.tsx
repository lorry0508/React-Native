import React from 'react';
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { IProgram } from '@/models/album';

const mapStateToprops = ({ album }: RootState) => {
    return {
        list: album.list,

    };
};

const connector = connect(mapStateToprops);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {

}

class List extends React.Component<IProps> {
    renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
        return <Text>{item.title}</Text>;
    }
    keyExtractor = (item: IProgram) => item.id;
    render() {
        const { list } = this.props;
        return (
            <FlatList
                data={list}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        );
    }
}

export default connector(List);