import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';
import { viewportWidth } from '@/utils/index';

const mapStateToProps = ({ category }: RootState) => {
    return {
        myCategorys: category.myCategorys,
        categorys: category.categorys
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState { }

interface IState {
    myCategorys: ICategory[]
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

class Category extends React.Component<IProps, IState> {
    state = {
        myCategorys: this.props.myCategorys
    };
    renderItem = (item: ICategory, index: number) => {
        return (
            <View key={item.id} style={{width: itemWidth, height: 40,}}>
                <View style={{flex: 1, backgroundColor: '#fff', margin: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{item.name}</Text>
                </View>
            </View>
        )
    }
    render() {
        const { categorys } = this.props;
        const { myCategorys } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.classifyName}>我的分类</Text>
                <View style={styles.classifyView}>
                    {myCategorys.map(this.renderItem)}
                </View>
                <View>
                    <Text>所有分类</Text>
                    <View style={styles.classifyView}>
                        {categorys.map(this.renderItem)}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6f6'
    },
    classifyName: {
        fontSize: 16,
        marginTop: 14,
        marginBottom: 8
    },
    classifyView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    }
});

export default connector(Category);