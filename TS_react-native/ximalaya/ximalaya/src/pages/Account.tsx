import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { ModalStackNavigation } from '@/navigator/index';
import defaultAvatarImg from '@/assets/default_avatar.png';
import Touchable from '@/components/Touchable';

interface IProps {
    navigation: ModalStackNavigation;
}

class Account extends React.Component<IProps> {
    onPress = () => {
        const { navigation } = this.props;
        navigation.navigate('Login')
    }
    render() {
        return (
            <View style={styles.loginView}>
                <Image source={defaultAvatarImg} style={styles.avatar} />
                <View style={styles.right}>
                    <Touchable style={styles.loginBtn} onPress={this.onPress}>
                        <Text style={styles.loginBtnText}>立即登录</Text>
                    </Touchable>
                    <Text style={styles.tip}>登陆后自动同步所有记录哦~</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginView: {
        flexDirection: 'row',
        margin: 15
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    right: {
        flex: 1,
        marginLeft: 15
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 26,
        width: 76,
        borderRadius: 13,
        borderColor: '#f86442',
        borderWidth: 1,
        marginBottom: 12
    },
    loginBtnText: {
        color: '#f86442',
        fontWeight: '900'
    },
    tip: {
        color: '#999'
    }
});

export default Account;