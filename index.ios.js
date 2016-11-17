/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
	Component,
} from 'react'

import {
	AppRegistry,
	I18nManager,
	ListView,
	View,
	StyleSheet,
	Switch,
	Text,
	TextInput,
} from 'react-native'

import InvertibleScrollView from 'react-native-invertible-scroll-view'

export default class RTLapp extends Component {
	constructor() {
		super()

		const ds = new ListView.DataSource({
			rowHasChanged: (r1,
			r2) => r1 !== r2,
		});

		this.state = {
			dataSource: ds.cloneWithRows([
				'1 John',
				'2 Joel',
				'3 James',
				'4 Jimmy',
				'5 Jackson',
				'6 Jillian',
				'7 Julie',
				'8 Devin',
			]),
			isRTL: I18nManager.isRTL,
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.things}>
					<Text style={[
						styles.thing,
						styles.red,
					]}>1</Text>
					<Text style={[
						styles.thing,
						styles.blue,
					]}>2</Text>
					<Text style={[
						styles.thing,
						styles.green,
					]}>3</Text>
				</View>

				<View style={styles.separator}/>

				<TextInput style={styles.input} placeholder="Hello"/>

				<View style={styles.separator}/>

				<ListView
					style={styles.list}
					renderScrollComponent={props => <InvertibleScrollView {...props} />}
					contentContainerStyle={styles.listContainer}
					dataSource={this.state.dataSource}
					renderRow={rowData => <Text style={styles.listItem}>{rowData}</Text>}
					horizontal={true}
				/>

				<View style={styles.separator}/>

				<ListView
					style={styles.list}
					renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
					contentContainerStyle={styles.listContainer}
					dataSource={this.state.dataSource}
					renderRow={rowData => <Text style={styles.listItem}>{rowData}</Text>}
					horizontal={true}
				/>
				
				<View style={styles.separator}/>

				<Text style={styles.arabic}>أدخل عنوان البريد الإلكتروني الذي استخدمته لإنشاء حساب جادو بادو الخاص بك وسوف نرسل لك رسالة بريد إلكتروني لإعادة تعيين كلمة السر</Text>

				<View style={styles.separator}/>

				<Switch onValueChange={this._onDirectionChange.bind(this)} style={styles.rightAlignStyle} value={this.state.isRTL}/>
			</View>
		)
	}

	_onDirectionChange() {
		I18nManager.forceRTL(!this.state.isRTL)
		this.setState({
			isRTL: !this.state.isRTL,
		})

		this.forceUpdate()
	}
}

const styles = StyleSheet.create({
	blue: {
		backgroundColor: 'blue',
	},
	container: {
		alignItems: 'center',
		backgroundColor: '#EEE',
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		paddingTop: 40
	},
	green: {
		backgroundColor: 'green',
	},
	list: {
		backgroundColor: 'white',
		flexGrow: 0,
	},
	listContainer: {
		alignItems: 'flex-start'
		// flexDirection: 'row-reverse',
		// transform: [
	    //   { scaleX: -1 },
	    // ]
	},
	listItem: {
		padding: 20,
		// alignSelf: 'flex-end'
	},
	input: {
		backgroundColor: 'white',
		height: 60,
		padding: 20,
		textAlign: I18nManager.isRTL ? 'right' : 'left',
	},
	red: {
		backgroundColor: 'red',
	},
	separator: {
		marginBottom: 10,
		marginTop: 10,
	},
	thing: {
		color: 'white',
		padding: 20,
	},
	things: {
		flexDirection: 'row',
	},
	arabic: {
		// alignSelf: 'flex-start',
		textAlign: 'right'
	}
})

AppRegistry.registerComponent('RTLapp', () => RTLapp)
