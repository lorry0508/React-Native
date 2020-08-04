import React from 'react';
import { View, Text, FlatList, ListRenderItemInfo, Alert, StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { IProgram } from '@/models/album';
import Item from './Item';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { ITabProps } from '../Tab';

const mapStateToprops = ({ album }: RootState) => {
    return {
        list: album.list,
    };
};

const connector = connect(mapStateToprops);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

class List extends React.Component<IProps> {
    onPress = (data: IProgram) => {
        console.log(data, '节目')
    }   
    renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
        return <Item data={item} index={index} onPress={this.onPress} />;
    }
    keyExtractor = (item: IProgram) => item.id;
    render() {
        const { list, panRef, tapRef, nativeRef } = this.props;
        return (
            <NativeViewGestureHandler 
                ref={nativeRef} 
                waitFor={tapRef}
                simultaneousHandlers={panRef}
            >
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
        backgroundColor: '#fff'
    }
});

export default connector(List);