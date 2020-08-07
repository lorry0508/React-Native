import React from 'react';
import { Text, FlatList, ListRenderItemInfo } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { IProgram } from '@/models/album';

const mapStateToProps = ({album}: RootState) => {
    return {
        list: album.list
    };
};

const connector = connect(mapStateToProps);

type ModalState = ConnectedProps<typeof connector>;

interface IProps extends ModalState {};

class List extends React.Component<IProps> {
    keyExtractor = (item: IProgram) => item.id;
    renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
        return (
            <Text>{item.title}</Text>
        );
    }
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