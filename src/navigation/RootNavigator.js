import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import routes from './routes'

import SplashScreen from '../screens/SplashScreen'
import TabNavigator from './TabNavigator'
import ProductDetail from '../screens/ProductDetail'

const RootNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name={routes.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={routes.TAB_NAVIGATOR} component={TabNavigator} />
        <Stack.Screen name={routes.PRODUCT_DETAIL} component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
