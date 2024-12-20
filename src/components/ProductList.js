import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'

import Button from './Button'
import Empty from './Empty'

import { useNavigation } from '@react-navigation/native'
import routes from '../navigation/routes'

import { useSelector, useDispatch } from 'react-redux'
import { setFavorites, setBasket } from '../redux/slice'

import FavoriteIcon from '../assets/icons/favorite.svg'
import FavoriteFillIcon from '../assets/icons/favorite-fill.svg'

const ProductList = ({ products }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const favorites = useSelector(state => state.slice.favorites)

  const [offset, setOffset] = useState(1)

  const SHOW_LIMIT = 12

  useEffect(() => {
    setOffset(1)
  }, [products])

  const sliceProducts = () => {
    if (products?.length <= SHOW_LIMIT * offset) {
      return products
    }

    return products?.slice(0, SHOW_LIMIT * offset)
  }

  const addToBasket = product => {
    dispatch(setBasket({ product, type: 'add' }))
  }

  const Product = ({ item }) => {
    const isFavorite =
      favorites.length > 0
        ? favorites.find(favorite => favorite.id == item.id)
        : false

    return (
      <Pressable
        style={styles.product}
        onPress={() =>
          navigation.navigate(routes.PRODUCT_DETAIL, { product: item })
        }>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />

            <TouchableOpacity
              style={styles.icon}
              onPress={() => dispatch(setFavorites(item))}>
              {isFavorite ? (
                <FavoriteFillIcon
                  width={getRH(30)}
                  height={getRH(30)}
                  color={Colors.RED}
                />
              ) : (
                <FavoriteIcon
                  width={getRH(30)}
                  height={getRH(30)}
                  color={Colors.RED}
                />
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, styles.price]}>{item.price} ₺</Text>
          <Text style={styles.text}>{item.name}</Text>
        </View>

        <Button title="Add to Cart" onPress={() => addToBasket(item)} />
      </Pressable>
    )
  }

  return (
    <FlatList
      data={sliceProducts()}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <Product item={item} />}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapperStyle}
      onEndReached={() => setOffset(offset + 1)}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={() => <Empty title="No products found." />}
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
  product: {
    flex: 1,
    paddingVertical: getRH(10),
    borderWidth: getRH(0.5),
    borderColor: Colors.GRAY,
    borderRadius: getRH(8),
    paddingHorizontal: getRW(8),
    marginBottom: getRH(20)
  },
  content: {
    flex: 1
  },
  imageContainer: {
    width: '100%',
    height: getRH(170),
    borderRadius: getRH(12),
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: getRH(16)
  },
  image: {
    width: '100%',
    height: '100%'
  },
  icon: {
    position: 'absolute',
    top: getRH(10),
    right: getRH(10),
    zIndex: 1
  },
  text: {
    color: Colors.BLACK,
    fontWeight: '500',
    marginBottom: getRH(16)
  },
  price: {
    color: Colors.BLUE,
    fontWeight: 'bold'
  }
})
