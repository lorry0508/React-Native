import React from 'react';
import Item from './item';
import { View, Animated } from 'react-native';
import { Text } from 'react-native-svg';

export interface Message {
    id: number;
    title: string;
}

export interface IBarrage extends Message {
    trackIndex: number;
}

interface IProps {
    data: Message[];
    maxTrack: number;
}

interface IState {
    data: Message[];
    list: Message[][];
}

// 添加弹幕
function addBarrage(data: Message[], maxTrack: number, list: IBarrage[][]) {
    for (let i = 0; i < data.length; i++) {
        const trackIndex = getTrackIndex(list, maxTrack);
        if (trackIndex < 0) {
            continue;
        }
        if (!list[trackIndex]) {
            list[trackIndex] = [];
        }
        const barrage = {
            ...data[i],
            trackIndex
        };
        list[trackIndex].push(barrage);
    }
}

/**
 * [
 *  [{id: '', title: ''}],
 *  [{id: '', title: ''}]
 * ]
 * 获取弹幕轨道的下标
 * @param list 
 * @param maxTrack 
 */
function getTrackIndex(list: IBarrage[][], maxTrack: number) {
    for (let i = 0; i < maxTrack; i++) {
        const barragesOfTrack = list[i];
        if (!barragesOfTrack || barragesOfTrack.length === 0) {
            return i;
        }
    }
    return - 1;
}

class Barrage extends React.Component<IProps, IState> {
    state = {
        data: this.props.data,
        list: [this.props.data.map(item => ({ ...item, trackIndex: 0 }))],
    }
    translateX = new Animated.Value(0);
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        const { data, maxTrack } = nextProps;
        if (data !== prevState.data) {
            return {
                data,
                list: addBarrage(data, maxTrack, prevState.list)
            };
        }
        return null;
    }
    outside = (data: Message) => {
        const { list } = this.state;
        const newList = list.slice();
        if (newList.length > 0) {
            const deleteIndex = newList.indexOf(data);
            if (deleteIndex > -1) {
                newList.splice(deleteIndex, 1);
                this.setState({
                    list: newList,
                })
            }
        }
    }
    renderItem = (item: IBarrage[], index: number) => {
        return (
            item.map((barrage, index) => {
                return <Item key={barrage.id} data={barrage} outside={this.outside} />
            })
        );
    }
    render() {
        const { list } = this.state;
        return (
            <View>
                {list.map(this.renderItem)}
            </View>
        );
    }


}

export default Barrage;