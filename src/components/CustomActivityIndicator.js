import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const CustomActivityIndicator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  )
}

export default CustomActivityIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
