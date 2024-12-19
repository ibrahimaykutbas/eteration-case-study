import { SafeAreaView, Text, StyleSheet } from 'react-native'
import React from 'react'

import Colors from '../theme/Colors'

import TopMenu from '../components/TopMenu'

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Profile" />
      <Text>Profile</Text>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  }
})
