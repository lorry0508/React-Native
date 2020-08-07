import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { ConnectedProps, connect } from 'react-redux';

const mapStateToProps = ({ album }: RootState) => {
    return {
        introduction: album.introduction
    }
};

const connector = connect(mapStateToProps);

type ModalState = ConnectedProps<typeof connector>;

class Introduction extends React.Component<ModalState> {
    render() {
        const { introduction } = this.props;
        return (
            <Text style={styles.container}>
                {introduction}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default connector(Introduction);