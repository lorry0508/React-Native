// import Navigator from '@/navigator/index';
// // import Navigator from '@/navigator/BottomTabs';

// export default Navigator;

/* 
    dva-core-ts 的基本使用
*/
import React from 'react';
import Navigator from '@/navigator/index';
import { Provider } from 'react-redux';
import store from '@/config/dva';

export default class extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
};