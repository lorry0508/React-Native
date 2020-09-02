import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import Touchable from '@/components/Touchable';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import * as Yup from 'yup'; // *导出所有的导出项

interface Values {
    account: string;
    password: string;
}

const initialValues: Values = {
    account: '',
    password: ''
};

const mapStateToProps = ({ loading }: RootState) => {
    return {
        loading: loading.effects['user/login']
    }
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

const validationSchema = Yup.object().shape({
    account: Yup.string().trim().required('请输入您的账号'),
    password: Yup.string().trim().required('请输入您的密码')
});

class Login extends React.Component<ModelState> {
    onSubmit = (values: Values) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/login',
            payload: values
        })
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled">
                <Text style={styles.logo}>听书</Text>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={this.onSubmit}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, errors }) => {
                        return (
                            <View>
                                <TextInput
                                    onChangeText={handleChange('account')}
                                    onBlur={handleBlur('account')}
                                    value={values.account}
                                />
                                {
                                    errors.account && <Text>{errors.account}</Text>
                                }
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {
                                    errors.password && <Text>{errors.password}</Text>
                                }
                                <Touchable onPress={handleSubmit}>
                                    <Text>登录</Text>
                                </Touchable>
                            </View>
                        )
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
        marginTop: 40
    }
});

export default connector(Login);