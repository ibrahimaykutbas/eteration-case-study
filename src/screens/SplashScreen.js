import { SafeAreaView, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

import routes from '../navigation/routes'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(routes.TAB_NAVIGATOR)
    }, 1000)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Eteration</Text>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Colors.WHITE,
    fontSize: Fonts.size(40),
    fontWeight: '500'
  }
})
