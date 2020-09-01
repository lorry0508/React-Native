import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

class Login extends React.Component {
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled">
                <Text style={styles.logo}>听书</Text>
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

export default Login;