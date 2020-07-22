import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList, RootStackNavigation, ModalStackNavigation} from '@/navigator/index';
import coverRight from '@/assets/cover-right.png';
import Tab from './Tab';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';
import { IProgram } from '@/models/album';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'Album'>;
  navigation: ModalStackNavigation;
}
const HEADER_HEIGHT = 260;
const USE_NATIVE_DRIVER = true;

class Album extends React.Component<IProps> {
  panRef = React.createRef<PanGestureHandler>();
  tapRef = React.createRef<TapGestureHandler>();
  nativeRef = React.createRef<NativeViewGestureHandler>();
  RANGE = [-(HEADER_HEIGHT - this.props.headerHeight), 0];
  translationY = new Animated.Value(0);
  lastScrollY = new Animated.Value(0);
  lastScrollYValue = 0;
  reverseLastScrollY = Animated.multiply(
    new Animated.Value(-1),
    this.lastScrollY,
  );
  translationYValue = 0;
  translationYOffset = new Animated.Value(0);
  translateY = Animated.add(
    Animated.add(this.translationY, this.reverseLastScrollY),
    this.translationYOffset,
  );
  componentDidMount() {
    const {dispatch, route, navigation} = this.props;
    const {id} = route.params.item;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      },
    });
    navigation.setParams({
      opacity: this.translateY.interpolate({
        inputRange: this.RANGE,
        outputRange: [1, 0],
      }),
    });
  }

  onItemPress = (data: IProgram, index: number) => {
    const {navigation, dispatch, list, route} = this.props;
    const previousItem = list[index - 1];
    const nextItem = list[index + 1];
    dispatch({
      type: 'player/setState',
      payload: {
        previousId: previousItem ? previousItem.id : '',
        nextId: nextItem ? nextItem.id : '',
        title: data.title,
        thumbnailUrl: route.params.item.image,
        sounds: list.map(item => ({id: item.id, title: item.title})),
      }
    })
    navigation.navigate("Detail", {id: data.id});
  }

  onScrollDrag = Animated.event(
    [{nativeEvent: {contentOffset: {y: this.lastScrollY}}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.lastScrollYValue = nativeEvent.contentOffset.y;
      },
    },
  );

  onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: this.translationY}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
    },
  );

  onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {translationY} = nativeEvent;
      translationY -= this.lastScrollYValue;
      this.translationYOffset.extractOffset();
      this.translationYOffset.setValue(translationY);
      this.translationYOffset.flattenOffset();
      this.translationY.setValue(0);
      this.translationYValue += translationY;
      let maxDeltaY = -this.RANGE[0] - this.translationYValue;
      if (this.translationYValue < this.RANGE[0]) {
        this.translationYValue = this.RANGE[0];
        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[0],
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = this.RANGE[1];
      } else if (this.translationYValue > this.RANGE[1]) {
        this.translationYValue = this.RANGE[1];
        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[1],
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = -this.RANGE[0];
      }
      if (this.tapRef.current) {
        const tap: any = this.tapRef.current;
        tap.setNativeProps({
          maxDeltaY,
        });
      }
    }
  };

  renderHeader = () => {
    const {headerHeight, summary, author, route} = this.props;
    const {title, image} = route.params.item;
    return (
      <View style={[styles.header, {paddingTop: headerHeight}]}>
        <Image source={{uri: image}} style={styles.background} />
        <BlurView
          blurType="light"
          blurAmount={10}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.leftView}>
          <Image source={{uri: image}} style={styles.thumbnail} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{uri: author.avatar}} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <TapGestureHandler ref={this.tapRef} maxDeltaY={-this.RANGE[0]}>
        <View style={styles.container}>
          <PanGestureHandler
            ref={this.panRef}
            simultaneousHandlers={[this.tapRef, this.nativeRef]}
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onHandlerStateChange}>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [
                    {
                      translateY: this.translateY.interpolate({
                        inputRange: this.RANGE,
                        outputRange: this.RANGE,
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              {this.renderHeader()}
              <View style={{height: viewportHeight - this.props.headerHeight}}>
                <Tab
                  panRef={this.panRef}
                  tapRef={this.tapRef}
                  nativeRef={this.nativeRef}
                  onScrollDrag={this.onScrollDrag}
                  onItemPress={this.onItemPress}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain',
  },
  rightView: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  summary: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  summaryText: {
    color: '#fff',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  name: {
    color: '#fff',
  },
});

function Wrapper(props: IProps) {
  const headerHeight = useHeaderHeight();
  return <Album headerHeight={headerHeight} {...props} />;
}

export default connector(Wrapper);
