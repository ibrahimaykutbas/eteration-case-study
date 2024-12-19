import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { getRW, getRH } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

import Button from './Button'
const Footer = ({ price, buttonTitle, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.priceTitle}>
        Price:<Text style={styles.price}> {price.toLocaleString()} ₺</Text>
      </Text>
      <Button
        title={buttonTitle}
        onPress={onPress}
        propStyles={styles.button}
      />
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: getRW(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: getRH(16)
  },
  priceTitle: {
    color: Colors.BLUE,
    fontSize: Fonts.size(20)
  },
  price: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: Fonts.size(25)
  },
  button: {
    paddingHorizontal: getRW(20)
  }
})
