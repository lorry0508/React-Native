import React from 'react';
import Item from './item';
import { View, Animated } from 'react-native';
import { Text } from 'react-native-svg';

export interface Message {
    id: number;
    title: string;
}

interface IProps {
    data: Message[]
}

interface IState {
    data: Message[];
    list: Message[];
}

class Barrage extends React.Component<IProps, IState> {
    state = {
        data: this.props.data,
        list: this.props.data,
    }
    translateX = new Animated.Value(0);
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        const { data } = nextProps;
        if (data !== prevState.data) {
            return {
                data,
                list: prevState.list.concat(data)
            };
        }
        return null;
    }
    outside = (data: Message) => {
        const { list } = this.state;
        const newList = list.slice();
        if(newList.length > 0) {
            const deleteIndex = newList.indexOf(data);
            if(deleteIndex > -1) {
                newList.splice(deleteIndex, 1);
                this.setState({
                    list: newList,
                })
            }
        }
    }
    renderItem = (item: Message, index: number) => {
        return (
            <Item key={item.id} data={item} outside={this.outside} />
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