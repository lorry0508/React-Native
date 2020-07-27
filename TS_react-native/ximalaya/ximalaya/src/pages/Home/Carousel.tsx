import React from 'react';
import SnapCarousel, {
    ParallaxImage,
    Pagination,
    AdditionalParallaxProps,
}
    from 'react-native-snap-carousel';
import { viewportWidth, wp, hp } from '@/utils/index';
import { View, StyleSheet } from 'react-native';

const data = [
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595840667334&di=b6f9eb1c3080daf1f3991f77126aa8b7&imgtype=0&src=http%3A%2F%2F01.minipic.eastday.com%2F20170421%2F20170421141708_405cb6c3f8850e8d7e1d392eb835e377_3.jpeg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595840667332&di=fa497e7d1340b4e373de13baa314bab6&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170426%2F20170426145543_d286b1d11013bff1d01c48c2a30b9586_10.jpeg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595840667339&di=7f08dc9696ea960550912c1f44cc46ff&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170221%2F20170221212912_cbff414ccd6113e1d49401b874e438c6_9.jpeg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595840667337&di=3aac73d0a9566a4cbb785efbe9e0ed57&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170511%2F20170511132314_6cab43df10415723a8f3bdd9dc5364ed_8.jpeg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595840667336&di=601d985f659b0e663daacd5fe558a5bd&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170122%2F20170122145324_c074bd4d20c537b795f6cc97f90d9e50_2.jpeg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595840667335&di=b0ac0eb8810f784c46534477ea81a38d&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170418%2F20170418103013_6303894600645ee49cd4fd7f5125e3b5_2.jpeg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595840667335&di=1e6eb59bc18f67bf253a7f22cf9674a6&imgtype=0&src=http%3A%2F%2F01.minipic.eastday.com%2F20170113%2F20170113174441_4a700387e67e0119e06a111ee2292bf7_10.jpeg"
];

const sliderWidth = viewportWidth;
const sidewidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sidewidth + wp(2) * 2;

class Carousel extends React.Component {
    state = {
        activeSlide: 0
    };
    renderItem = (
        { item }: { item: string },
        parallaxProps?: AdditionalParallaxProps, //视差
    ) => {
        return (
            <ParallaxImage
                source={{ uri: item }}
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