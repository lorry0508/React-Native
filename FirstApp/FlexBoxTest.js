import React, { Component } from 'react';

import { Text, View } from 'react-native';

export default class FlexBoxTest extends Component {
    render() {
        return (
            <View style={ {flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor:"darkgray",marginTop:20, height: 300, borderWidth:1,}}>
                <View style={ {alignSelf: 'flex-end',width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>1</Text>
                </View>
                <View style={ {width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>2</Text>
                </View>
                <View style={ {alignSelf: 'flex-start',flex: 1,width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>3</Text>
                </View>
                <View style={ {width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>4</Text>
                </View>
                <View style={ {alignSelf: 'flex-end',width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>5</Text>
                </View>
            </View>
        );
    }
}