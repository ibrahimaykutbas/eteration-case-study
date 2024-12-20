import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'

import Empty from './Empty'
import Input from './Input'

import Product from './Product'

const ProductList = ({ products, searchable = false }) => {
  const [offset, setOffset] = useState(1)
  const [searchText, setSearchText] = useState('')

  const SHOW_LIMIT = 12

  useEffect(() => {
    setOffset(1)
  }, [products])

  const searchProduct = () => {
    return products?.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  const sliceProducts = () => {
    if (searchText) {
      return searchProduct()
    }

    if (products?.length <= SHOW_LIMIT * offset) {
      return products
    }

    return products?.slice(0, SHOW_LIMIT * offset)
  }

  return (
    <FlatList
      data={sliceProducts()}
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
          <Input
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search"
            propContainerStyles={styles.input}
          />
        )
      }
    />
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
