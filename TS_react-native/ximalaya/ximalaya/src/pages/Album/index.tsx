import React from 'react';
import { View, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigator/index';

const mapStateToProps = ({ album }: RootState) => {
    return {
        summary: album.summary,
        author: album.author
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    headerHeight: number;
    route: RouteProp<RootStackParamList, 'Album'>
}

class Album extends React.Component<IProps> {
    componentDidMount() {
        const { dispatch, route } = this.props;
        const { id } = route.params.item;
        dispatch({
            type: 'album/fetchAlbum',
            payload: {
                id,
            }
        });
    }
    render() {
        const { headerHeight, summary, author, route } = this.props;
        const { title, image } = route.params.item;
        return (
            <View style={{ paddingTop: headerHeight }}>
                <Text>Album</Text>
            </View>
        );
    }
}

function AlbumWrapper(props: IProps) {
    const headerHeight = useHeaderHeight();
    return <Album headerHeight={headerHeight} {...props} />;
}

export default connector(AlbumWrapper);


