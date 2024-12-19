import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { getRW, getRH } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

import BackIcon from '../assets/icons/back.svg'
import AddIcon from '../assets/icons/add.svg'

const TopMenu = ({
  leftTitle,
  title,
  rightTitle,
  onPressLeft,
  onPressRight,
  leftIcon,
  rightIcon
}) => {
  const ICONS = {
    Back: <BackIcon width={getRH(27)} height={getRH(27)} />,
    Add: <AddIcon width={getRH(40)} height={getRH(40)} color={Colors.BLACK} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {onPressLeft && (
          <TouchableOpacity
            onPress={onPressLeft}
            style={styles.button}
            activeOpacity={0.8}>
            {ICONS[leftIcon]}
            <Text style={styles.buttonTitle}>{leftTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.buttonContainer, styles.rightButtonContainer]}>
        {onPressRight && (
          <TouchableOpacity
            onPress={onPressRight}
            style={styles.button}
            activeOpacity={0.8}>
            {ICONS[rightIcon]}
            <Text style={styles.buttonTitle}>{rightTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default TopMenu

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getRH(15),
    paddingHorizontal: getRW(20),
    borderBottomWidth: getRH(0.2),
    borderBottomColor: Colors.GRAY2
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  rightButtonContainer: {
    alignItems: 'flex-end'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: Fonts.size(20),
    color: Colors.BLACK,
    fontWeight: '500'
  },
  title: {
    fontSize: Fonts.size(22),
    color: Colors.BLACK,
    fontWeight: '600',
    textAlign: 'center'
  }
})
