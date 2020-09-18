import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';
 
import Header from './subpages/Header';
import Footer from './subpages/Footer';
import Body from './subpages/Body';

class Home extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header />
                <ScrollView style={styles.srollContainer}>
                    <Body />
                </ScrollView>
                <Footer
                    onPressPrevious={() => {}}
                    onPressNext={() => {}}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    srollContainer: {
        flex: 1
    }
});

export default Home;