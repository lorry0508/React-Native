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

const Iconlisten: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M934.4 624c-26.4 0-48-21.6-48-48 0-15.2-0.8-30.4-2.4-44.8C869.6 414.4 805.6 144 520 144c-194.4 0-316 122.4-361.6 364-4 22.4-6.4 44.8-6.4 67.2 0 26.4-21.6 48-48 48s-48-21.6-48-48c0-28.8 2.4-56.8 8-84.8C118.4 200.8 276 48 520 48c137.6 0 254.4 53.6 336 155.2 82.4 102.4 112 228 123.2 315.2 2.4 18.4 3.2 37.6 3.2 56.8 0 27.2-20.8 48.8-48 48.8z"
        fill={getIconColor(color, 0, '#3FA7F7')}
      />
      <Path
        d="M284.8 484C263.2 476 240 472 216 472c-67.2 0-126.4 32-164 80.8v258.4c36.8 50.4 94.4 84 160 84.8 25.6 0 50.4-4.8 72.8-13.6V484zM824.8 464c-24 0-47.2 4-68.8 12v400c25.6 11.2 53.6 18.4 81.6 18.4 64 0 117.6-33.6 152-83.2V544.8C951.2 496 891.2 464 824.8 464z"
        fill={getIconColor(color, 1, '#F4D576')}
      />
      <Path
        d="M121.6 495.2L112 864s8 12 56 24c45.6 11.2 48 8 48 8l11.2-425.6s-6.4-8.8-48.8 0-56.8 24.8-56.8 24.8z"
        fill={getIconColor(color, 2, '#E54B9B')}
      />
      <Path
        d="M666.4 617.6h-40.8c-4 0-8 1.6-10.4 4l-67.2 60.8-46.4-73.6c-2.4-4-5.6-6.4-10.4-7.2-4-0.8-8.8 0-12 2.4l-93.6 62.4H360c-8.8 0-16 7.2-16 16s7.2 16 16 16H390.4c3.2 0 6.4-0.8 9.6-2.4l84-56 48 76c2.4 4 6.4 6.4 11.2 7.2h2.4c4 0 8-1.6 10.4-4l76.8-68.8h34.4c8.8 0 16-7.2 16-16s-8-16.8-16.8-16.8z"
        fill={getIconColor(color, 3, '#E6444C')}
      />
      <Path
        d="M942.4 494.4l8 351.2s-2.4 12.8-46.4 34.4c-17.6 8.8-36 14.4-56 16l-11.2-425.6s6.4-8.8 48.8 0 56.8 24 56.8 24z"
        fill={getIconColor(color, 4, '#E54B9B')}
      />
    </Svg>
  );
};

Iconlisten.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(Iconlisten) : Iconlisten;
