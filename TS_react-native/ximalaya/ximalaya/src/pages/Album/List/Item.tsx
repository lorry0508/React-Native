import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { IProgram } from '@/models/album';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont';

interface IProps {
    data: IProgram;
    index: number;
    onPress: (data: IProgram, index: number) => void;
}

class Item extends React.Component<IProps> {
    onPress = () => {
        const {onPress, data, index} = this.props;
        if (typeof onPress === 'function') {
            onPress(data, index);
        }
    }
    render() {
        const { data, index } = this.props;
        return (
            <Touchable style={styles.item} onPress={this.onPress}>
                <Text style={styles.serial}>{index + 1}</Text>
                <View style={styles.content}>
                    <Text style={styles.title}>{data.title}</Text>
                    <View style={styles.info}>
                        <View style={styles.iconView}>
                            <Icon name="icon-V" color="#939393" />
                            <Text style={styles.iconText}>{data.playVolume}</Text>
                        </View>
                        <View style={styles.iconView}>
                            <Icon name="icon-time" color="#939393" />
                            <Text style={styles.iconText}>{data.duration}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.date}>{data.date}</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 20,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginHorizontal: 25,
    },
    serial: {
        fontSize: 14,
        color: '#838383',
        fontWeight: '800',
    },
    title: {
        fontWeight: '500',
        marginBottom: 15,
    },
    info: {
        flexDirection: 'row',
    },
    iconView: {
        flexDirection: 'row',
        marginRight: 10,
    },
    iconText: {
        marginHorizontal: 5,
        color: '#939393'
    },
    date: {
        color: '#939393',
    }
});

export default Item;