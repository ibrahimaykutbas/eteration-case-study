import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { getRW, getRH } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

import Input from './Input'
import Button from './Button'

const FilterHeader = ({ value, onChangeText, openModal, filterTypes }) => {
  return (
    <View style={styles.container}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        propContainerStyles={styles.input}
      />
      <View style={styles.filter}>
        <View style={{ flex: 1 }}>
          {filterTypes && (
            <Text style={styles.sectionTitle}>
              Filters:
              <Text style={styles.filters}> {filterTypes}</Text>
            </Text>
          )}
        </View>
        <Button title="Filter" propStyles={styles.button} onPress={openModal} />
      </View>
    </View>
  )
}

export default FilterHeader

const styles = StyleSheet.create({
  container: {
    marginBottom: getRH(20)
  },
  input: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: getRW(8),
    paddingHorizontal: getRW(10),
    marginBottom: getRH(10)
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    color: Colors.BLACK,
    fontSize: Fonts.size(20),
    fontWeight: '500'
  },
  filters: {
    color: Colors.BLACK,
    fontSize: Fonts.size(18),
    fontWeight: '400'
  },
  button: {
    paddingHorizontal: getRW(40)
  }
})
