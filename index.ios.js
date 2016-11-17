import React, {Component} from 'react'

import {
    AppRegistry,
    I18nManager,
    ListView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View
} from 'react-native'

import InvertibleScrollView from 'react-native-invertible-scroll-view'

export default class RTLapp extends Component {
    constructor() {
        super()

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: ds.cloneWithRows([
                '1 John',
                '2 Joel',
                '3 James',
                '4 Jimmy',
                '5 Jackson',
                '6 Jillian',
                '7 Julie',
                '8 Devin'
            ]),
            isRTL: I18nManager.isRTL
        }
    }

    _onDirectionChange() {
        I18nManager.forceRTL(!this.state.isRTL)

        this.setState({
            isRTL: !this.state.isRTL
        })
    }

    render() {
        return (
            <ScrollView style={styles.root} contentContainerStyle={styles.container}>
                <Switch onValueChange={this._onDirectionChange.bind(this)} value={this.state.isRTL}/>

                <View style={styles.separator}/>

                <View style={styles.things}>
                    <Text style={[styles.thing, styles.red]}>1</Text>
                    <Text style={[styles.thing, styles.blue]}>2</Text>
                    <Text style={[styles.thing, styles.green]}>3</Text>
                </View>

                <View style={styles.separator}/>

                <TextInput style={styles.input} placeholder="Hello"/>

                <View style={styles.separator}/>

                <ListView style={styles.list} renderScrollComponent={props => <InvertibleScrollView {...props}/>} contentContainerStyle={styles.listContainer} dataSource={this.state.dataSource} renderRow={this._renderRow} horizontal={true}/>

                <View style={styles.separator}/>

                <ListView style={styles.list} renderScrollComponent={props => <InvertibleScrollView {...props} inverted/>} contentContainerStyle={styles.listContainer} dataSource={this.state.dataSource} renderRow={this._renderRow} horizontal={true}/>

                <View style={styles.separator}/>

                <Text style={styles.arabic}>أدخل عنوان البريد الإلكتروني الذي استخدمته لإنشاء حساب جادو بادو الخاص بك وسوف نرسل لك رسالة بريد إلكتروني لإعادة تعيين كلمة السر</Text>
            </ScrollView>
        )
    }

    _renderRow(text, section, row) {
        let style = [
            styles.listItem, row % 2 === 0 && styles.even
        ]

        return <Text style={style}>{text}</Text>
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#EEE',
        flex: 1,
        padding: 20,
        paddingTop: 40
    },
    container: {
        alignItems: 'stretch'
    },
    things: {
        flexDirection: 'row'
    },
    thing: {
        color: 'white',
        flex: 1,
        paddingVertical: 20,
        textAlign: 'center'
    },
    red: {
        backgroundColor: 'red'
    },
    blue: {
        backgroundColor: 'blue'
    },
    green: {
        backgroundColor: 'green'
    },
    input: {
        backgroundColor: 'white',
        height: 60,
        padding: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    list: {
        backgroundColor: 'white'
    },
    listContainer: {
        alignItems: 'flex-start'
    },
    listItem: {
        padding: 20
    },
    even: {
        backgroundColor: '#CCC'
    },
    arabic: {
        backgroundColor: 'white',
        padding: 20,
        textAlign: 'right'
    },
    separator: {
        marginBottom: 10,
        marginTop: 10
    }
})

AppRegistry.registerComponent('RTLapp', () => RTLapp)
