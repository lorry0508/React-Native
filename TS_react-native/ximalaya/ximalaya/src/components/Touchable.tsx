import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

// React.memo()和 React.PureComponent有相同的优化作用
const Touchable: React.FC<TouchableOpacityProps> = React.memo((props) => (
    <TouchableOpacity activeOpacity={0.8} {...props} />
));

export default Touchable;