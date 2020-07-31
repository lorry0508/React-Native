import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';
import Item from './Item';
import { RootStackNavigation } from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

const mapStateToProps = ({ category }: RootState) => {
    return {
        myCategorys: category.myCategorys,
        categorys: category.categorys,
        isEdit: category.isEdit
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation
}

interface IState {
    myCategorys: ICategory[]
}

const fixedItems = [0, 1];

class Category extends React.Component<IProps, IState> {
    state = {
        myCategorys: this.props.myCategorys
    };
    constructor(props: IProps) {
        super(props);
        props.navigation.setOptions({
            headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />
        })
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'category/setState',
            payload: {
                isEdit: false
            }
        })
    }
    onSubmit = () => {
        const { dispatch } = this.props;
        const { myCategorys } = this.state;
        dispatch({
            type: 'category/toggle',
            payload: {
                myCategorys
            }
        })
    }
    onLongPress = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'category/setState',
            payload: {
                isEdit: true
            }
        })
    }
    onPress = (item: ICategory, index: number, selected: boolean) => {
        const { isEdit } = this.props;
        const { myCategorys } = this.state;
        const disabled = fixedItems.indexOf(index) > -1;
        if(disabled) return;
        if (isEdit) {
            if (selected) {
                this.setState({
                    myCategorys: myCategorys.filter(selectedItem => selectedItem.id !== item.id)
                })
            } else {
                this.setState({
                    myCategorys: myCategorys.concat([item])
                })
            }
        }
    }
    renderItem = (item: ICategory, index: number) => {
        const { isEdit } = this.props;
        const disabled = fixedItems.indexOf(index) > -1;
        return (
            <Touchable key={item.id} onPress={() => this.onPress(item, index, true)} onLongPress={this.onLongPress}>
                <Item
                    data={item}
                    isEdit={isEdit}
                    disabled={disabled}
                    selected
                />
            </Touchable>
        );
    }
    renderUnSelectedItem = (item: ICategory, index: number) => {
        const { isEdit } = this.props;
        return (
            <Touchable key={item.id} onPress={() => this.onPress(item, index, false)} onLongPress={this.onLongPress}>
                <Item
                    data={item}
                    isEdit={isEdit}
                    selected={false}
                />
            </Touchable>
        );
    }
    render() {
        const { categorys } = this.props;
        const { myCategorys } = this.state;
        const classifyGroup = _.groupBy(categorys, (item) => item.classify);
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.classifyName}>我的分类</Text>
                <View style={styles.classifyView}>
                    {myCategorys.map(this.renderItem)}
                </View>
                <View>
                    {
                        Object.keys(classifyGroup).map(classify => {
                            return (
                                <View key={classify}>
                                    <Text style={styles.classifyName}>{classify}</Text>
                                    <View style={styles.classifyView}>
                                        {classifyGroup[classify].map((item, index) => {
                                            if (myCategorys.find(selectedItem => selectedItem.id === item.id)) {
                                                return null;
                                            }
                                            return this.renderUnSelectedItem(item, index);
                                        })}
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>
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
        marginBottom: 8,
        marginLeft: 10
    },
    classifyView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    }
});

export default connector(Category);