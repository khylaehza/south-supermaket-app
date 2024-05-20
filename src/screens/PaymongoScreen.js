import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useData } from '../../DataContext';
import { Colors } from '../themes';
import moment from 'moment';
const PaymongoScreen = ({route}) => {
	const { approvalUrl, setApprovalUrl, url, curUser } = useData();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const _onNavigationStateChange = async (webViewState) => {
		if (
			webViewState.url.includes('https://refresh-load.firebaseapp.com/')
		) {
			setApprovalUrl(null);
			navigation.navigate('Success');
		}
	};

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				backgroundColor: Colors.orange300,
			}}
		>
			{approvalUrl ? (
				<WebView
					style={{ height: '100%', width: '100%', marginTop: 20 }}
					source={{ uri: approvalUrl }}
					onNavigationStateChange={_onNavigationStateChange}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					startInLoadingState={false}
				/>
			) : (
				<View
					style={{
						flex: 1,
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ActivityIndicator
						color={'white'}
						size={'large'}
						style={{
							alignSelf: 'center',
							justifyContent: 'center',
							marginTop: 20,
						}}
					/>
				</View>
			)}
		</View>
	);
};

export default PaymongoScreen;
