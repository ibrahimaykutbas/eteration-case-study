import { SafeAreaView, Text, StyleSheet } from 'react-native'
import React from 'react'

import Colors from '../theme/Colors'

import TopMenu from '../components/TopMenu'

const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Favorites" />
      <Text>Favorites</Text>
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  }
})
