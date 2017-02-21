import React, {Component} from 'react'

import {
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
import ScrollableTabView from 'react-native-scrollable-tab-view'

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

                <ScrollableTabView style={styles.tabView} renderTabBar={this._renderTabBar}>
                    <View style={styles.tab} tabLabel="One">
                        <Text style={styles.dropCap}>1</Text>
                        <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque, mauris in bibendum varius, purus metus scelerisque orci, in tristique neque leo luctus nulla. Sed vitae posuere orci. Donec tristique nunc metus, eu venenatis purus hendrerit et.</Text>
                    </View>
                    <View style={styles.tab} tabLabel="Two">
                        <Text style={styles.dropCap}>2</Text>
                        <Text style={styles.paragraph}>Morbi id nulla pharetra, consequat felis quis, egestas justo. Vestibulum eget est ac mauris aliquet placerat in vel est. Suspendisse scelerisque faucibus sapien, sit amet interdum enim ullamcorper at. Proin rutrum, sapien id fermentum rutrum, justo ex euismod ligula, quis maximus justo nisi ultrices arcu.</Text>
                    </View>
                    <View style={styles.tab} tabLabel="Three">
                        <Text style={styles.dropCap}>3</Text>
                        <Text style={styles.paragraph}>Nulla velit nibh, porta a ex ac, vehicula commodo est. Maecenas sed sodales dolor, eu auctor nulla. Quisque eget augue arcu. Proin non metus eu purus ultrices maximus a eget urna. Aliquam erat volutpat. Sed a leo metus. Donec ultricies quam sed tellus aliquet vestibulum. Donec ac turpis tempor, egestas magna ut, laoreet arcu.</Text>
                    </View>
                </ScrollableTabView>

                <View style={styles.separator}/>

				<ScrollableTabView style={styles.tabView} renderTabBar={this._renderTabBar}>
                    <View style={styles.tab} tabLabel="One">
                        <ListView style={styles.list} renderScrollComponent={props => <InvertibleScrollView {...props}/>} contentContainerStyle={styles.listContainer} dataSource={this.state.dataSource} renderRow={this._renderRow}/>
                    </View>
                    <View style={styles.tab} tabLabel="Two">
                        <ListView style={styles.list} renderScrollComponent={props => <InvertibleScrollView {...props}/>} contentContainerStyle={styles.listContainer} dataSource={this.state.dataSource} renderRow={this._renderRow}/>
                    </View>
                </ScrollableTabView>

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
        let style = [styles.listItem]

        if (row % 2 === 0) {
            style.push(styles.even)
        }

        return <Text style={style}>{text}</Text>
    }

    _renderTabBar(props) {
        let styles = {
            container: {
                alignItems: 'center',
                bottom: 0,
                height: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                width: props.containerWidth,
                zIndex: 1
            },
            link: {
                backgroundColor: 'lightgray',
                borderRadius: 3,
                height: 6,
                marginHorizontal: 2,
                width: 6
            },
            active: {
                backgroundColor: 'gray'
            }
        }

        let tabs = React.Children.map(props.tabs, (tab, index) => {
            let isActive = props.activeTab === index

            let style = [styles.link]

            if (isActive) {
                style.push(styles.active)
            }

            return <View style={style}></View>
        })

        return <View style={[styles.container, props.style]}>{tabs}</View>
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
    tabView: {
        backgroundColor: 'white'
    },
    tab: {
        flexDirection: 'row',
        padding: 20,
        height: 200
    },
    dropCap: {
        alignSelf: 'flex-start',
        fontSize: 20
    },
    paragraph: {
        marginLeft: 10
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
