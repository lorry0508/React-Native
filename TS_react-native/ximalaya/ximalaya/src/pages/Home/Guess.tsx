import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';

const mapStateToProps = ({ home }: RootState) => {
    return {
        guess: home.guess,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Guess extends React.Component<ModelState> {
    componentDidMount() {
        this.fetch();
    }
    fetch = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'home/fetchGuess'
        });
    }
    renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Image source={{uri: item.image}} style={styles.image} />
                <Text numberOfLines={2}>{item.title}</Text>
            </View>
        );
    }
    render() {
        const { guess } = this.props;
        return (
            <View style={styles.container}>
                <FlatList 
                    numColumns={3}
                    data={guess}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16
    },
    item: {
        flex: 1,
        marginVertical: 6,
        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 10
    }
});

export default connector(Guess);