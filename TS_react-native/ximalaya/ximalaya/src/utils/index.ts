import {Dimensions} from 'react-native';
import { NavigationState, NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

// 根据百分比获取宽度
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

function getActiveRouteName(state: NavigationState) {
  let route;
  route = state.routes[state.index];
  while(route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
}

function formatTime(seconds: number) {
  const m = parseInt((seconds % (60 * 60)) / 60 + '', 10);
  const s = parseInt((seconds % 60) + '', 10);
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

export {viewportWidth, viewportHeight, wp, hp, getActiveRouteName, formatTime, navigationRef, navigate, goBack};
