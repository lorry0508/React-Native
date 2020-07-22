import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {ModalStackNavigation} from '@/navigator/index';
import defaultAvatarImg from '@/assets/default_avatar.png';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Authorized from './Authorized';

const mapStateToProps = ({user}: RootState) => {
  return {
    user: user.user,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: ModalStackNavigation;
}

class Account extends React.Component<IProps> {
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
  };

  logout = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/logout',
    });
  };

  render() {
    const {user} = this.props;
    return (
      <Authorized authority={!!user}>
        <View>
          <View style={styles.loginView}>
            <Image source={{uri: user?.avatar}} style={styles.avatar} />
            <View style={styles.right}>
              <Text>{user?.name}</Text>
            </View>
          </View>
          <Touchable style={[styles.loginBtn, {marginLeft: 15}]} onPress={this.logout}>
            <Text style={styles.loginBtnText}>退出登录</Text>
          </Touchable>
        </View>
      </Authorized>
    );
  }
}

const styles = StyleSheet.create({
  loginView: {
    flexDirection: 'row',
    margin: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  right: {
    flex: 1,
    marginLeft: 15,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    width: 76,
    borderRadius: 13,
    borderColor: '#f86442',
    borderWidth: 1,
    marginBottom: 12,
  },
  loginBtnText: {
    color: '#f86442',
    fontWeight: '900',
  },
  tip: {
    color: '#999',
  },
});

export default connector(Account);
