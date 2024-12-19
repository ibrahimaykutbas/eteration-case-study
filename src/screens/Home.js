import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'

import { getRW, getRH } from '../theme/Units'
import Colors from '../theme/Colors'

import TopMenu from '../components/TopMenu'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

import useApi from '../hooks/useApi'
import productsApi from '../services/products'

const Home = () => {
  const getProductsApi = useApi(productsApi.getProducts)

  useEffect(() => {
    getProdutcs()
  }, [])

  const getProdutcs = async () => {
    try {
      await getProductsApi.request()
    } catch (error) {
      console.log('fetchUsers -> error', error)
    }
  }

  if (getProductsApi.loading) return <CustomActivityIndicator />

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="E-Market" />
      <ScrollView>
        <Text style={{ color: 'red' }}>
          {JSON.stringify(getProductsApi.data, null, 2)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  }
})
