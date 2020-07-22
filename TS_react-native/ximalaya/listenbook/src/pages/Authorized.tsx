import React from 'react';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {View, Image, Text, StyleSheet} from 'react-native';
import Touchable from '@/components/Touchable';
import defaultAvatarImg from '@/assets/default_avatar.png';
import {navigate} from '../utils';

interface IProps {
  authority?: boolean;
  noMatch?: () => JSX.Element;
}

class Authorized extends React.Component<IProps> {
  onPress = () => {
    navigate('Login');
  };
  render() {
    const {children, authority, noMatch} = this.props;
    if (authority) {
      return children;
    }
    return this.renderNoMatch();
  }

  renderNoMatch = () => {
    if (this.props.noMatch) {
      return <View>{this.props.noMatch()}</View>;
    }
    return (
      <View style={styles.loginView}>
        <Image source={defaultAvatarImg} style={styles.avatar} />
        <View style={styles.right}>
          <Touchable style={styles.loginBtn} onPress={this.onPress}>
            <Text style={styles.loginBtnText}>立即登录</Text>
          </Touchable>
          <Text style={styles.tip}>登录后自动同步所有记录哦～</Text>
        </View>
      </View>
    );
  };
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

export default Authorized;
