import { View, StyleSheet, TextInput } from 'react-native'
import React from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

const Input = ({
  value,
  onChangeText,
  placeholder,
  propContainerStyles,
  propInputStyles
}) => {
  return (
    <View style={[styles.container, propContainerStyles]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.GRAY}
        style={[styles.input, propInputStyles]}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: getRW(20)
  },
  input: {
    width: '100%',
    height: '100%',
    color: Colors.BLACK,
    paddingVertical: getRH(14),
    fontWeight: '500',
    fontSize: Fonts.size(18)
  }
})
