import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

import TopMenu from './TopMenu'
import Input from './Input'

import RNModal from 'react-native-modal'

import { FILTERS } from '../utils/constant'

const Filters = ({ isVisible, onClose, onSave }) => {
  const [searchText, setSearchText] = useState('')

  const [filters, setFilters] = useState({
    sort: '',
    brand: []
  })

  const sortFilters = FILTERS['sort']
  const brandFilters = FILTERS['brand']

  const handleFilter = (key, value) => {
    if (key === 'sort') {
      if (filters.sort === value) {
        setFilters({
          ...filters,
          sort: ''
        })
      } else {
        setFilters({
          ...filters,
          sort: value
        })
      }
    } else {
      if (filters.brand.includes(value)) {
        setFilters({
          ...filters,
          brand: filters.brand.filter(brand => brand !== value)
        })
      } else {
        setFilters({
          ...filters,
          brand: [...filters.brand, value]
        })
      }
    }
  }

  const clearFilters = () => setFilters({ sort: '', brand: [] })

  const closeModal = () => {
    onClose()
    onSave(filters)
  }

  const searchedBrands = brandFilters.options.filter(option =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <RNModal
        isVisible={isVisible}
        swipeDirection={['down']}
        onSwipeComplete={closeModal}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={{ margin: 0 }}>
        <View style={styles.content}>
          <TopMenu
            leftTitle="Back"
            title="Filter"
            rightTitle="Clear"
            onPressLeft={closeModal}
            onPressRight={() => {
              clearFilters()
              onSave()
            }}
          />

          {/* Sort */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{sortFilters.title}</Text>

            {sortFilters.options.map(option => (
              <Pressable
                key={option.id}
                style={styles.filter}
                onPress={() => handleFilter(sortFilters.type, option.key)}>
                <View style={styles.radio}>
                  {filters.sort === option.key && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text>{option.name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Brand */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{brandFilters.title}</Text>

            <Input
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search Brand"
              propContainerStyles={styles.input}
            />

            {searchedBrands.map(option => (
              <Pressable
                key={option.id}
                style={styles.filter}
                onPress={() => handleFilter(brandFilters.type, option.name)}>
                <View style={[styles.radio, styles.checkbox]}>
                  {filters.brand.includes(option.name) && (
                    <View style={[styles.radioInner, styles.checkboxInner]} />
                  )}
                </View>
                <Text>{option.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </RNModal>
    </View>
  )
}

export default Filters

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop: getRH(100),
    borderTopLeftRadius: getRH(20),
    borderTopRightRadius: getRH(20),
    backgroundColor: Colors.WHITE
  },
  sectionContainer: {
    paddingHorizontal: getRH(20),
    borderBottomWidth: getRH(2),
    borderBottomColor: Colors.LIGHT_GRAY
  },
  sectionTitle: {
    color: Colors.BLACK,
    fontSize: Fonts.size(20),
    marginVertical: getRH(15)
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: getRW(10),
    marginBottom: getRH(15)
  },
  radio: {
    width: getRH(20),
    height: getRH(20),
    borderRadius: getRH(20),
    borderWidth: getRH(2),
    borderColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getRW(10)
  },
  radioInner: {
    width: getRH(12),
    height: getRH(12),
    borderRadius: getRH(12),
    backgroundColor: Colors.BLUE
  },
  checkbox: {
    borderRadius: getRH(5)
  },
  checkboxInner: {
    borderRadius: getRH(3)
  },
  input: {
    marginBottom: getRH(20),
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: getRW(8),
    paddingHorizontal: getRW(10)
  }
})
