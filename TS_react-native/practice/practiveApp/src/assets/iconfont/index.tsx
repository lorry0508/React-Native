/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Iconshouye from './Iconshouye';
import Iconfaxian from './Iconfaxian';
import Iconlisten from './Iconlisten';
import Iconwode from './Iconwode';

export type IconNames = 'iconshouye' | 'iconfaxian' | 'iconlisten' | 'iconwode';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'iconshouye':
      return <Iconshouye key="1" {...rest} />;
    case 'iconfaxian':
      return <Iconfaxian key="2" {...rest} />;
    case 'iconlisten':
      return <Iconlisten key="3" {...rest} />;
    case 'iconwode':
      return <Iconwode key="4" {...rest} />;
  }

  return null;
};

export default React.memo ? React.memo(IconFont) : IconFont;
