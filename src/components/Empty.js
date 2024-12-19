import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { getRH } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

const Empty = ({ title = 'Empty' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Empty

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '70%',
    alignItems: 'center'
  },
  title: {
    fontSize: Fonts.size(20),
    color: Colors.BLACK,
    fontWeight: '500'
  }
})
