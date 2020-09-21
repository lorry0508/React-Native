/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const Iconfaxian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M297.130667 686.250667a254.378667 254.378667 0 0 1-21.845334-79.701334c-14.677333-139.605333 86.613333-264.704 226.218667-279.381333s264.704 86.613333 279.381333 226.218667c9.642667 91.818667-30.890667 177.408-99.498666 229.376"
        fill={getIconColor(color, 0, '#64EDAC')}
      />
      <Path
        d="M600.490667 524.458667c-18.773333 0-34.133333-15.36-34.133334-34.133334v-34.133333c0-18.773333 15.36-34.133333 34.133334-34.133333s34.133333 15.36 34.133333 34.133333v34.133333c0 18.773333-15.36 34.133333-34.133333 34.133334zM388.864 524.458667c-18.773333 0-34.133333-15.36-34.133333-34.133334v-34.133333c0-18.773333 15.36-34.133333 34.133333-34.133333s34.133333 15.36 34.133333 34.133333v34.133333c0 18.773333-15.36 34.133333-34.133333 34.133334z"
        fill={getIconColor(color, 1, '#333C4F')}
      />
      <Path
        d="M888.490667 569.941333c-0.512-0.341333-1.024-0.512-1.536-0.853333 1.706667-21.418667 1.536-43.178667-0.768-65.109333-20.224-191.914667-192.853333-331.690667-384.682667-311.552-93.013333 9.813333-176.64 55.210667-235.434667 127.829333-58.88 72.704-85.845333 163.925333-76.117333 256.853333 0.512 4.693333 1.109333 9.301333 1.706667 13.909334 0.938667 6.570667 2.218667 13.056 3.584 19.626666-9.216-5.546667-18.005333-11.093333-26.282667-16.64-59.648-40.362667-82.005333-74.922667-77.824-91.306666 3.498667-13.568 6.570667-25.258667 59.818667-33.962667a34.090667 34.090667 0 0 0 28.16-39.168c-3.072-18.602667-20.650667-31.232-39.168-28.16-58.282667 9.557333-100.181333 27.562667-114.858667 84.224-9.386667 36.266667 1.28 94.293333 105.642667 164.949333 81.152 54.954667 203.264 106.069333 335.018666 140.202667 106.922667 27.733333 213.077333 42.666667 301.909334 42.666667 7.850667 0 15.616-0.085333 23.210666-0.341334 153.088-4.778667 197.802667-54.272 208.298667-94.976 9.472-36.949333-1.962667-96.170667-110.677333-168.192z m-608.085334 84.736a279.637333 279.637333 0 0 1-21.162666-73.386666c-0.512-3.754667-1.024-7.509333-1.450667-11.264-7.850667-74.837333 13.909333-148.309333 61.269333-206.762667 47.36-58.453333 114.688-95.061333 189.525334-102.912 154.538667-16.213333 293.461333 96.256 309.674666 250.794667 10.325333 97.792-29.866667 191.744-107.52 251.989333-70.144-4.778667-148.650667-17.834667-228.010666-38.4-72.874667-18.944-142.250667-43.093333-202.325334-70.058667z m652.544 66.304c-4.608 17.749333-45.738667 37.888-125.354666 42.922667 29.952-35.925333 52.138667-77.141333 65.536-121.344 46.08 34.730667 63.658667 63.744 59.818666 78.421333z"
        fill={getIconColor(color, 2, '#333C4F')}
      />
    </Svg>
  );
};

Iconfaxian.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(Iconfaxian) : Iconfaxian;
