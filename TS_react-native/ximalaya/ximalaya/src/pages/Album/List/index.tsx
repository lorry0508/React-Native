import React from 'react';
import { Text, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { IProgram } from '@/models/album';
import Item from './Item';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { ITabProps } from '../Tab';

const mapStateToProps = ({ album }: RootState) => {
    return {
        list: album.list
    };
};

const connector = connect(mapStateToProps);

type ModalState = ConnectedProps<typeof connector>;

type IProps = ModalState & ITabProps;

class List extends React.Component<IProps> {
    onPress = (data: IProgram) => {
        console.log(data, "节目单项打印")
    }
    keyExtractor = (item: IProgram) => item.id;
    renderItem = ({ item, index }: ListRenderItemInfo<IProgram>) => {
        return (
            <Item data={item} index={index} onPress={this.onPress} />
        );
    }
    render() {
        const { list, panRef } = this.props;
        return (
            <NativeViewGestureHandler waitFor={panRef}>
                <FlatList
                    style={styles.container}
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </NativeViewGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    }
})

export default connector(List);