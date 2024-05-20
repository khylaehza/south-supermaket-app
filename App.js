import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import Navigator from './Navigator';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useFonts } from 'expo-font';

export default function App() {
	const [fontsLoaded] = useFonts({
		'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
		'Rubik-Italic': require('./assets/fonts/Rubik-Italic.ttf'),
		'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
		'Rubik-SemiBold': require('./assets/fonts/Rubik-SemiBold.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<RootSiblingParent>
			<GluestackUIProvider config={config}>
				<SafeAreaProvider>
					<Navigator />
					<StatusBar style='auto' />
				</SafeAreaProvider>
			</GluestackUIProvider>
		</RootSiblingParent>
	);
}
