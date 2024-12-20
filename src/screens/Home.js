import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'

import Colors from '../theme/Colors'
import { getRW } from '../theme/Units'

import CustomActivityIndicator from '../components/CustomActivityIndicator'
import TopMenu from '../components/TopMenu'

import useApi from '../hooks/useApi'
import productsApi from '../services/products'

import ProductList from '../components/ProductList'

const Home = () => {
  const getProductsApi = useApi(productsApi.getProducts)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      await getProductsApi.request()
    } catch (error) {
      console.log('getProducts -> error', error)
    }
  }

  if (getProductsApi.loading) return <CustomActivityIndicator />

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="E-Market" />

      <View style={styles.content}>
        <ProductList products={getProductsApi?.data} searchable />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  content: {
    flex: 1,
    paddingHorizontal: getRW(20)
  }
})
