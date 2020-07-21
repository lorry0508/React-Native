import React from 'react';

import {
    View,
    Text
} from 'react-native';

import SelectCareer from './SelectCareer';
import SelectCategory from './SelectCategory';

import {
    careerList, 
    ICareer,
} from '../../../../model/data';

interface IState {
    selectedCareerId: number;
    isSelectedCareer: boolean;
    canSelectLength: number;
    selectedCategoryIds: string[];
    selectedTypeIdLists: number[][];
    selectedServiceAreaIds: number[][];
    selectedServicePromiseIds: number[];
}

class Body extends React.PureComponent<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedCareerId: 0,
            isSelectedCareer: false,
            canSelectLength: 3,   // 可以选择的服务品类个数
            selectedCategoryIds: [],
            selectedTypeIdLists: [],
            selectedServiceAreaIds: [],
            selectedServicePromiseIds: [],
        }
    }
    // 切换职业
    onChangeCareer = (career: ICareer) => {
        const { isSelectedCareer } = this.state;
        this.setState({
        selectedCareerId: career.id,
        isSelectedCareer: !isSelectedCareer,
        canSelectLength: career.id === 0 ? 5 : 3,
        })
    }
    render() {
        const {
            selectedCareerId, 
            isSelectedCareer,
        } = this.state;
        return (
            <View>
                <SelectCareer
                    careerList={careerList}
                    selectedCareerId={selectedCareerId}
                    isSelectedCareer={isSelectedCareer}
                    onChangeCareer={this.onChangeCareer}
                />
                <SelectCategory />
            </View>
        );
    }
}

export default Body;