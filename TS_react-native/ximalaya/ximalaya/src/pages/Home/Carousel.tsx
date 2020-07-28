import React from 'react';
import SnapCarousel, {
    ParallaxImage,
    Pagination,
    AdditionalParallaxProps,
}
    from 'react-native-snap-carousel';
import { viewportWidth, wp, hp } from '@/utils/index';
import { View, StyleSheet } from 'react-native';
import { ICarousel } from '@/models/home';

const sliderWidth = viewportWidth;
const sidewidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sidewidth + wp(2) * 2;

interface IProps {
    data: ICarousel[];
}
class Carousel extends React.Component<IProps> {
    state = {
        activeSlide: 0
    };
    renderItem = (
        { item }: { item: ICarousel },
        parallaxProps?: AdditionalParallaxProps, //视差
    ) => {
        return (
            <ParallaxImage
                source={{ uri: item.image }}
                style={styles.image}
                containerStyle={styles.imageContainer}
                parallaxFactor={0.8} // 视差滚动速度，默认0.3
                showSpinner // 动画
                spinnerColor='rgba(0, 0, 0, 0.25)'
                {...parallaxProps}
            />
        );
    };
    onSnapToItem = (index: number) => {
        this.setState({
            activeSlide: index,
        });
    };
    get pagination() {
        const { data } = this.props;
        const { activeSlide } = this.state;
        return (
            <View style={styles.paginationWrapper}>
                <Pagination
                    containerStyle={styles.paginationContainer}
                    dotContainerStyle={styles.dotContainer}
                    dotStyle={styles.dotStyle}
                    inactiveDotScale={0.7}
                    inactiveDotOpacity={0.4}
                    dotsLength={data.length} // 出现的分页个数
                    activeDotIndex={activeSlide}
                />
            </View>
        );
    }
    render() {
        const { data } = this.props;
        return (
            <View>
                <SnapCarousel
                    data={data}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages // 是否设置视差图
                    onSnapToItem={this.onSnapToItem} // 获取当期的图片
                    loop // 设置循环滚动
                    autoplay // 自动滚动
                />
                {this.pagination}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: itemWidth,
        height: sideHeight,
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover'
    },
    paginationWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationContainer: {
        position: 'absolute',
        top: -20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 3,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dotContainer: {
        marginHorizontal: 6,
    },
    dotStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
});

export default Carousel;