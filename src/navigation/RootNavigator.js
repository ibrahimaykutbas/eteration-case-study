import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import routes from './routes'

import SplashScreen from '../screens/SplashScreen'
import AppNavigator from './AppNavigator'

const RootNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name={routes.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={routes.APP_NAVIGATOR} component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
