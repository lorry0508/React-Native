import React from 'react';
import { Text, Animated, Easing } from 'react-native';
import { viewportWidth } from '@/utils/index';
import { Message } from '.';

interface IProps {
    data: Message;
    outside: (data: Message) => void;
}

class Item extends React.PureComponent<IProps> {
    translateX = new Animated.Value(0);
    componentDidMount() {
        const { outside, data } = this.props;
        Animated.timing(this.translateX, {
            toValue: 10,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start((finished) => {
            if (finished) {
                outside(data);
            }
        });
    }
    render() {
        const { data } = this.props;
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: Math.random() * 100,
                    transform: [{
                        translateX: this.translateX.interpolate({
                            inputRange: [0, 10],
                            outputRange: [viewportWidth, 0]
                        })
                    }]
                }}
            >
                <Text>{data.title}</Text>
            </Animated.View >
        );
    }
}

export default Item;