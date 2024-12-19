import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import React from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

const Button = ({ title, onPress, propStyles, disabled, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        propStyles,
        (disabled || loading) && styles.disabled
      ]}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.BLACK} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    height: getRH(60),
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getRH(8)
  },
  title: {
    fontSize: Fonts.size(20),
    color: Colors.BLACK,
    fontWeight: '600'
  },
  disabled: {
    backgroundColor: Colors.GRAY
  }
})