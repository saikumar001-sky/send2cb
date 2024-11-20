import {Text, View} from 'react-native';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartKyc from '../screens/StartKyc';
import Send2CB from '../screens/Send2CB';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Send2CB">
        <Stack.Screen
          name="Send2CB"
          component={Send2CB}
          options={{title: 'Send2CB', headerShown: false}}
        />
        <Stack.Screen
          name="StartKyc"
          component={StartKyc}
          options={{title: 'Send2CB', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
