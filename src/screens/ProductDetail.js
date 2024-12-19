import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React from 'react'

import Colors from '../theme/Colors'
import { getRH, getRW } from '../theme/Units'
import Fonts from '../theme/Fonts'

import TopMenu from '../components/TopMenu'
import Footer from '../components/Footer'

import FavoriteIcon from '../assets/icons/favorite.svg'
import FavoriteFillIcon from '../assets/icons/favorite-fill.svg'

import { useSelector, useDispatch } from 'react-redux'
import { setFavorites, setBasket } from '../redux/slice'

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const favorites = useSelector(state => state.slice.favorites)

  const product = route.params.product

  const isFavorite = favorites.find(item => item.id === product.id)

  const handleFavoriteProduct = () => {
    dispatch(setFavorites(product))
  }

  const handleAddToBasket = () => {
    dispatch(setBasket({ product, type: 'add' }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        onPressLeft={() => navigation.goBack()}
        leftIcon="Back"
        title={product?.name}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: product?.image }} />

            <TouchableOpacity
              style={styles.icon}
              onPress={handleFavoriteProduct}>
              {isFavorite ? (
                <FavoriteFillIcon
                  width={getRH(40)}
                  height={getRH(40)}
                  color={Colors.RED}
                />
              ) : (
                <FavoriteIcon
                  width={getRH(40)}
                  height={getRH(40)}
                  color={Colors.RED}
                />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>{product?.name}</Text>

          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>

      <Footer
        price={product?.price}
        buttonTitle="Add to Basket"
        onPress={handleAddToBasket}
      />
    </SafeAreaView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  content: {
    flex: 1,
    paddingHorizontal: getRW(20)
  },
  imageContainer: {
    height: getRH(250),
    borderRadius: getRH(8),
    overflow: 'hidden',
    marginVertical: getRH(20)
  },
  image: {
    width: '100%',
    height: '100%'
  },
  icon: {
    position: 'absolute',
    top: getRH(15),
    right: getRH(15),
    zIndex: 1
  },
  text: {
    fontSize: Fonts.size(30),
    fontWeight: '600'
  },
  description: {
    fontSize: Fonts.size(20),
    fontWeight: '400',
    color: Colors.GRAY3,
    marginTop: getRH(10),
    marginBottom: getRH(20)
  },
  footer: {
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
