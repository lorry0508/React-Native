import home from './home';

const models = [home];

export type RootState = {
    home: typeof home.state;
};

export default models;