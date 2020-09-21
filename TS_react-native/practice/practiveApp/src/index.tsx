import React from 'react';
import Navigator from '@/navigator';
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
}

