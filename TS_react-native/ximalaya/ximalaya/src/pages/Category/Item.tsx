import React from 'react';
import { ICategory } from '@/models/category';
import { View, Text, StyleSheet } from 'react-native';
import { viewportWidth } from '@/utils/index';

interface IProps {
    isEdit: boolean;
    selected: boolean;
    data: ICategory;
    disabled: boolean;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

class Item extends React.Component<IProps> {
    render() {
        const { data, isEdit, selected, disabled } = this.props;
        return (
            <View key={data.id} style={styles.itemWrapper}>
                <View style={[styles.item, disabled && styles.disabled]}>
                    <Text>{data.name}</Text>
                    {
                        isEdit && !disabled && (
                            <View style={styles.icon}>
                                <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
                            </View>
                        )
                    }
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
    },
    icon: {
        position: 'absolute',
        top: -5,
        right: -5,
        height: 16,
        width: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f86442',
        borderRadius: 8
    },
    iconText: {
        color: '#fff',
        lineHeight: 16
    },
    disabled: {
        backgroundColor: '#ccc',
    }
});

export default Item;