import React, { Component } from 'react';

import { Text, View } from 'react-native';

export default class FlexBoxTest extends Component {
    render() {
        return (
            <View style={ {flexDirection: 'row-reverse',backgroundColor:"darkgray",marginTop:20, flexWrap: 'wrap'}}>
                <View style={ {width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>1</Text>
                </View>
                <View style={ {width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>2</Text>
                </View>
                <View style={ {width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>3</Text>
                </View>
                <View style={ {width:100,height:40,backgroundColor:"darkcyan",margin:5}}>
                    <Text style={ {fontSize:16}}>4</Text>
                </View>
            </View>
        );
    }
}