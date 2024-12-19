import { SafeAreaView, Text, StyleSheet } from 'react-native'
import React from 'react'

import Colors from '../theme/Colors'

import TopMenu from '../components/TopMenu'

const Basket = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Basket" />
      <Text>Basket</Text>
    </SafeAreaView>
  )
}

export default Basket

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  }
})
