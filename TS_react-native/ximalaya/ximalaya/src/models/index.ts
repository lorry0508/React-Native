import { DvaLoadingState } from 'dva-loading-ts';
import home from './home';
import category from './category';

const models = [home, category];

export type RootState = {
    home: typeof home.state;
    category: typeof category.state;
    loading: DvaLoadingState
};

export default models;