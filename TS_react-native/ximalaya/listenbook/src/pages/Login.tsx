import React from 'react';
import {ScrollView, Text, StyleSheet, View, TextInput} from 'react-native';
import {Formik, Field} from 'formik';
import Touchable from '@/components/Touchable';
import {RootState} from '../models';
import {connect, ConnectedProps} from 'react-redux';
import * as Yup from 'yup';
import Input from '@/components/Input';

interface Values {
  account: string;
  password: string;
}

const initialValues: Values = {
  account: '',
  password: '',
};

const mapStateToProps = ({loading}: RootState) => {
  return {
    loading: loading.effects['user/login'],
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

const validationSchema = Yup.object().shape({
  account: Yup.string()
    .trim()
    .required('请输入您的账号'),
  password: Yup.string()
    .trim()
    .required('请输入密码'),
});

class Login extends React.Component<ModelState> {
  onSubmit = (values: Values) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/login',
      payload: values,
    });
  };
  render() {
    const {loading} = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>听书</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this.onSubmit}>
          {({handleSubmit}) => {
            return (
              <View>
                <Field
                  name="account"
                  placeholder="请输入账号"
                  component={Input}
                />
                <Field
                  name="password"
                  placeholder="请输入密码"
                  component={Input}
                  secureTextEntry
                />
                <Touchable disabled={loading} onPress={handleSubmit} style={styles.loginBtn}>
                  <Text style={styles.loginBtnText}>登录</Text>
                </Touchable>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 40,
  },
  loginBtn: {
    marginTop: 40,
    margin: 10,
    height: 40,
    borderRadius: 20,
    borderColor: '#ff4000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default connector(Login);
