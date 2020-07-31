import React from 'react';
import { ICategory } from '@/models/category';
import { View, Text, StyleSheet } from 'react-native';
import { viewportWidth } from '@/utils/index';

interface IProps {
    data: ICategory;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

class Item extends React.Component<IProps> {
    render() {
        const { data } = this.props;
        return (
            <View key={data.id} style={styles.itemWrapper}>
                <View style={styles.item}>
                    <Text>{data.name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
        width: itemWidth,
        height: 48
    },
    item: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});

export default Item;