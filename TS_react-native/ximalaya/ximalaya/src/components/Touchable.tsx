import React, { useCallback } from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import _  from 'lodash';

// React.memo()和 React.PureComponent有相同的优化作用
const Touchable: React.FC<TouchableOpacityProps> = React.memo(({ style, onPress, ...rest }) => {
    const touchableStyle = rest.disabled ? [style, styles.disabled] : style;
    let throttleOnPress = undefined;
    if(typeof onPress === 'function') {
        throttleOnPress = useCallback(_.throttle(onPress, 1000, {leading: true, trailing: false}), [onPress]);
    }
    return (
        <TouchableOpacity onPress={throttleOnPress} style={touchableStyle} activeOpacity={0.8} {...rest} />
    );
});

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.5,
    }
});

export default Touchable;