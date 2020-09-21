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

const Iconwode: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M514 65.5c-246.5 0-446.3 199.8-446.3 446.3S267.5 958.1 514 958.1s446.3-199.8 446.3-446.3S760.5 65.5 514 65.5z m0 182.4c70.6 0 127.8 57.2 127.8 127.8S584.6 503.5 514 503.5s-127.8-57.2-127.8-127.8S443.5 247.9 514 247.9zM257.8 767.8c0-121.1 84-222.6 196.9-249.3 17.7 9.3 37.9 14.6 59.3 14.6s41.6-5.3 59.3-14.6c112.9 26.8 196.9 128.2 196.9 249.3H257.8z"
        fill={getIconColor(color, 0, '#29ABE2')}
      />
    </Svg>
  );
};

Iconwode.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(Iconwode) : Iconwode;
