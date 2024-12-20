import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'

import Empty from './Empty'

import Product from './Product'
import Filters from './Filters'
import FilterHeader from './FilterHeader'

const ProductList = ({ products, searchable = false }) => {
  const [offset, setOffset] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [productList, setProductList] = useState([])
  const [filterTypes, setFilterTypes] = useState('')

  const SHOW_LIMIT = 12

  useEffect(() => {
    setOffset(1)
    sliceProducts()
  }, [products, searchText])

  const searchProduct = () => {
    return products?.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  const handleFilterTypes = filters => {
    let filtersString = ''

    if (filters?.sort === 'price_high_to_low') {
      filtersString = filtersString + 'Price high to low. '
    } else if (filters?.sort === 'price_low_to_high') {
      filtersString = filtersString + 'Price low to high. '
    }

    if (filters?.brand.length > 0) {
      filtersString = filtersString + filters?.brand.join(', ')
    }

    setFilterTypes(filtersString)
  }

  const sliceProducts = filters => {
    let filteredProducts = products

    setFilterTypes('')

    if (searchText || filters?.sort || filters?.brand.length > 0) {
      if (searchText) {
        filteredProducts = searchProduct()
      }

      if (filters?.sort === 'price_high_to_low') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
      } else if (filters?.sort === 'price_low_to_high') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
      }

      if (filters?.brand.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters?.brand.some(brand => product.brand === brand)
        )
      }

      handleFilterTypes(filters)
    }

    setProductList(filteredProducts)
    setModalVisible(false)
  }

  return (
    <>
      <FlatList
        data={productList.slice(0, offset * SHOW_LIMIT)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Product product={item} />}
        numColumns={2}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapperStyle}
        onEndReached={() => setOffset(offset + 1)}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => <Empty title="No products found." />}
        ListHeaderComponent={
          searchable && (
            <FilterHeader
              value={searchText}
              onChangeText={setSearchText}
              openModal={() => setModalVisible(true)}
              filterTypes={filterTypes}
            />
          )
        }
      />

      <Filters
        isVisible={modalVisible}
        onClose={() => setModalVisible(!modalVisible)}
        onSave={sliceProducts}
      />
    </>
  )
}

export default ProductList

const styles = StyleSheet.create({
  container: {
    marginTop: getRH(20)
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    gap: getRW(20)
  },
  input: {
    marginBottom: getRH(20),
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: getRW(8),
    paddingHorizontal: getRW(10)
  }
})
