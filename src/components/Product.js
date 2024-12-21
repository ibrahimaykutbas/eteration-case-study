import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import React from 'react'

import { getRW, getRH } from '../theme/Units'
import Colors from '../theme/Colors'

import Button from './Button'

import { useNavigation } from '@react-navigation/native'
import routes from '../navigation/routes'

import { useSelector, useDispatch } from 'react-redux'
import { setFavorites, setBasket } from '../redux/slice'

import FavoriteIcon from '../assets/icons/favorite.svg'
import FavoriteFillIcon from '../assets/icons/favorite-fill.svg'

const Product = ({ product }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const favorites = useSelector(state => state.slice.favorites)

  const isFavorite = favorites.find(favorite => favorite.id == product.id)

  return (
    <Pressable
      style={styles.product}
      onPress={() => navigation.navigate(routes.PRODUCT_DETAIL, { product })}
      testID="product">
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: product.image }}
            testID="product-image"
          />

          <TouchableOpacity
            style={styles.icon}
            onPress={() => dispatch(setFavorites(product))}
            testID="favorite-button">
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

        <Text style={[styles.text, styles.price]}>{product.price} ₺</Text>
        <Text style={styles.text}>{product.name}</Text>
      </View>

      <Button
        title="Add to Cart"
        onPress={() => dispatch(setBasket({ product, type: 'add' }))}
      />
    </Pressable>
  )
}

export default Product

const styles = StyleSheet.create({
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
