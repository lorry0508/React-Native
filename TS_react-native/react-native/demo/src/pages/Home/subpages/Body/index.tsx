import React from 'react';
import {
  View,
} from 'react-native';
import SelectCareer from './SelectCareer';
import SelectCategory from './SelectCategory';
import SelectServiceArea from './SelectServiceArea';
import {
  careerList, 
  ICareer,
} from '../../../../model/data';
import SelectServicePromise from './SelectServicePromise';

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

  clean = () => {
    this.setState({
      selectedCategoryIds: [],
      selectedTypeIdLists: [],
    })
  }

  // 保存服务类目和服务类型
  saveCategory = (selectedCategoryId: string, selectedTypeIds: number[], currentIndex: number) => {
    const { selectedCategoryIds, selectedTypeIdLists } = this.state;
    const newSelectedCategoryIds = [ ...selectedCategoryIds ];
    const newSelectedTypeIdLists = [ ...selectedTypeIdLists ];
    newSelectedCategoryIds[currentIndex] = selectedCategoryId;
    newSelectedTypeIdLists[currentIndex] = selectedTypeIds;
    this.setState({
      selectedCategoryIds: newSelectedCategoryIds,
      selectedTypeIdLists: newSelectedTypeIdLists,
    });
  }

  saveServiceArea = (selectedPointAreaIds: number[], selectedOtherAreaIds: number[]) => {
    this.setState({
      selectedServiceAreaIds: [selectedPointAreaIds, selectedOtherAreaIds],
    })
  }

  saveServicePromise = (yuanchengFeiYongId: number, tailouFeiYongId: number, acceptId: number) => {
    this.setState({
      selectedServicePromiseIds: [yuanchengFeiYongId, tailouFeiYongId, acceptId],
    })
  }

  render() {
    const {
      selectedCareerId, 
      isSelectedCareer,
      canSelectLength,
      selectedCategoryIds,
      selectedTypeIdLists,
      selectedServiceAreaIds,
      selectedServicePromiseIds,
    } = this.state;
    return (
      <View>
        <SelectCareer 
          careerList={careerList}
          selectedCareerId={selectedCareerId}
          isSelectedCareer={isSelectedCareer}
          onChangeCareer={this.onChangeCareer}
        />
        {
          isSelectedCareer && (
            <>
              <SelectCategory 
                canSelectLength={canSelectLength}
                saveCategory={this.saveCategory}
                selectedCategoryIds={selectedCategoryIds}
                selectedTypeIdLists={selectedTypeIdLists}
                clean={this.clean}
              />
              <SelectServiceArea
                selectedServiceAreaIds={selectedServiceAreaIds}
                saveServiceArea={this.saveServiceArea}
              />
              <SelectServicePromise
                selectedServicePromiseIds={selectedServicePromiseIds}
                saveServicePromise={this.saveServicePromise}
              />
            </>
          )
        }
      </View>
    )
  }
}

export default Body;