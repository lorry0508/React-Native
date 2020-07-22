import React from 'react';
import {View, Text, Button, FlatList, ListRenderItemInfo, StyleSheet, Image} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import realm, { IProgram } from '@/config/realm';
import Icon from '@/assets/iconfont/Icon';
import { formatTime } from '../utils';
import Touchable from '@/components/Touchable';
import IconDeleteItemCcAndM from '@/assets/iconfont/IconDeleteItemCcAndM';

interface IProps {
  navigation: RootStackNavigation;
}

class Listen extends React.Component<IProps> {

  delete = (item: IProgram) => {
    realm.write(() => {
      const program = realm.objects('Program').filtered(`id='${item.id}'`);
      realm.delete(program);
      this.setState({});
    });
  }

  renderItem = ({item}: ListRenderItemInfo<IProgram>) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.bottom}>
            <Icon name="icon-time" color="#999" size={14} />
            <Text style={styles.text}>{formatTime(item.duration)}</Text>
            <Text style={styles.rate}>已播：{item.rate}%</Text>
          </View>
        </View>
        <Touchable style={styles.deleteBtn} onPress={() => {this.delete(item)}}>
          <IconDeleteItemCcAndM />
        </Touchable>
      </View>
    )
  }

  render() {
    const programs = realm.objects<IProgram>('Program');
    return (
      <FlatList 
        data={programs}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 3,
    margin: 5,
  },
  title: {
    color: '#999'
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#999',
    marginLeft: 5,
  },
  rate: {
    marginLeft: 20,
    color: '#f6a624'
  },
  deleteBtn: {
    padding: 10,
    justifyContent: 'center',
  }
})

export default Listen;
