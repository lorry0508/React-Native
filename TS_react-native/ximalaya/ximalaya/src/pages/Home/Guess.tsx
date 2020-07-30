import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IGuess } from '@/models/home';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont'

const mapStateToProps = ({ home }: RootState) => {
    return {
        guess: home.guess,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Guess extends React.PureComponent<ModelState> {
    componentDidMount() {
        this.fetch();
    }
    fetch = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'home/fetchGuess'
        });
    }
    renderItem = ({item}: {item: IGuess}) => {
        return (
            <Touchable style={styles.item} onPress={() => {}}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text numberOfLines={2}>{item.title}</Text>
            </Touchable>
        );
    }
    render() {
        const { guess } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Icon name='icon-xihuan' />
                        <Text style={styles.headerTitle}>猜你喜欢</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.moreText}>更多</Text>
                        <Icon name='icon-more' />
                    </View>
                </View>
                <FlatList
                    style={styles.list}
                    numColumns={3}
                    data={guess}
                    renderItem={this.renderItem}
                />
                <Touchable style={styles.changeGuess} onPress={this.fetch}>
                    <Icon name='icon-huanyipi' color='red' />
                    <Text style={styles.changeGuessText}>换一批</Text>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomColor: '#efefef',
        borderBottomWidth: StyleSheet.hairlineWidth, // 经过计算后的线条宽度，效果更好
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        marginLeft: 5,
        color: '#333'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    moreText: {
        color: '#6f6f6f'
    },
    list: {
        padding: 10
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
    },
    changeGuess: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    changeGuessText: {
        marginLeft: 5
    }
});

export default connector(Guess);