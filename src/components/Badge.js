import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

const Badge = ({ count = 1 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{count}</Text>
    </View>
  )
}

export default Badge

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.RED,
    width: getRH(25),
    height: getRH(25),
    position: 'absolute',
    top: getRH(-5),
    right: getRW(-12),
    borderRadius: getRH(25),
    borderWidth: getRH(1),
    borderColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Colors.WHITE,
    fontSize: Fonts.size(14),
    fontWeight: 'bold'
  }
})
