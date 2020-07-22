import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {deleteProgram, IProgram} from '@/config/realm';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont/index';
import {connect, ConnectedProps} from 'react-redux';
import {getTimeString} from '@/utils/index';
import {ModalStackNavigation} from '@/navigator/index';
import {RootState} from '../models';
import IconDeleteItemCcAndM from '@/assets/iconfont/IconDeleteItemCcAndM';

const mapStateToProps = ({found, loading}: RootState) => {
  return {
    programs: found.programs,
    loading:
      loading.effects['found/fetchPrograms'] !== undefined
        ? loading.effects['found/fetchPrograms']
        : false,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: ModalStackNavigation;
}

class History extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'found/fetchPrograms',
    });
  }
  onPress = (item: IProgram, index: number) => {
    const {dispatch, navigation, programs} = this.props;
    const previousItem = programs[index - 1];
    const nextItem = programs[index + 1];
    let params = {
      id: item.id,
    };
    dispatch({
      type: 'player/setState',
      payload: {
        currentId: item.id,
        playList: programs.map(i => i.id),
        previousId: previousItem && previousItem.id,
        nextId: nextItem && nextItem.id,
      },
    });
    navigation.navigate('ProgramDetail', params);
  };

  delete = (item: IProgram) => {
    const {dispatch} = this.props;
    deleteProgram(item).then(() => {
      dispatch({
        type: 'found/fetchPrograms',
      });
    });
  };

  onRefresh = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'found/fetchPrograms',
    });
  };

  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return (
      <Touchable style={styles.item} onPress={() => this.onPress(item, index)}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.contentBottom}>
            <View style={styles.iconView}>
              <Icon name="icon-time" color="#999" size={14} />
              <Text style={styles.text}>{getTimeString(item.duration)}</Text>
            </View>

            <Text style={styles.rate}>已播：{item.rate}%</Text>
          </View>
        </View>
        <Touchable onPress={() => this.delete(item)} style={styles.delete}>
          <IconDeleteItemCcAndM />
        </Touchable>
      </Touchable>
    );
  };

  render() {
    const {programs, loading} = this.props;
    return (
      <FlatList
        data={programs}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        onRefresh={this.onRefresh}
        refreshing={loading}
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
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  contentBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#999',
  },
  iconView: {
    flexDirection: 'row',
  },
  text: {
    color: '#999',
    marginLeft: 5,
  },
  rate: {
    marginLeft: 20,
    color: '#f6a624',
  },
  delete: {
    padding: 10,
    justifyContent: 'center',
  },
});

export default connector(History);
