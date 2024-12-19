import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Pressable
} from 'react-native'
import React from 'react'

import { getRH, getRW } from '../theme/Units'
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts'

import TopMenu from '../components/TopMenu'
import Footer from '../components/Footer'
import Empty from '../components/Empty'

import { useSelector, useDispatch } from 'react-redux'
import { setBasket } from '../redux/slice'

import AddIcon from '../assets/icons/add.svg'
import MinusIcon from '../assets/icons/minus.svg'

import routes from '../navigation/routes'

const Basket = ({ navigation }) => {
  const dispatch = useDispatch()

  const basket = useSelector(state => state.slice.basket)

  const total = basket.reduce((acc, item) => acc + item.price * item.count, 0)

  const handleProductCount = (product, type) => {
    dispatch(setBasket({ product, type }))
  }

  const Product = ({ item }) => (
    <>
      <View style={styles.item}>
        <Pressable
          style={styles.left}
          onPress={() =>
            navigation.navigate(routes.PRODUCT_DETAIL, { product: item })
          }>
          <Text style={styles.product}>{item.name}</Text>
          <Text style={styles.price}>
            {(item.price * item.count).toLocaleString()} ₺
          </Text>
        </Pressable>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleProductCount(item, 'minus')}
            activeOpacity={0.8}>
            <MinusIcon
              width={getRW(20)}
              height={getRW(20)}
              color={Colors.WHITE}
            />
          </TouchableOpacity>

          <View style={styles.count}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleProductCount(item, 'add')}
            activeOpacity={0.8}>
            <AddIcon
              width={getRW(20)}
              height={getRW(20)}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
        </View>
      </View>

      {basket[basket.length - 1].id !== item.id && <View style={styles.line} />}
    </>
  )

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Basket" />

      <View style={styles.content}>
        <FlatList
          data={basket}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Product item={item} />}
          contentContainerStyle={styles.flatlistContainer}
          ListEmptyComponent={() => <Empty title="Your basket is empty." />}
        />
      </View>

      {basket.length > 0 && (
        <Footer price={total} buttonTitle="Complete" onPress={() => {}} />
      )}
    </SafeAreaView>
  )
}

export default Basket

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  content: {
    flex: 1
  },
  flatlistContainer: {
    marginTop: getRH(20)
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: getRW(20),
    gap: getRW(20)
  },
  left: {
    flex: 1
  },
  product: {
    color: Colors.BLACK,
    fontSize: Fonts.size(20),
    fontWeight: '400'
  },
  price: {
    color: Colors.BLUE,
    fontSize: Fonts.size(20),
    fontWeight: 'bold'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButton: {
    width: getRW(40),
    height: getRW(40),
    backgroundColor: Colors.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getRW(5)
  },
  count: {
    width: getRW(50),
    height: getRW(50),
    backgroundColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: getRW(2),
    borderRadius: getRW(5)
  },
  countText: {
    color: Colors.WHITE,
    fontWeight: '600',
    fontSize: Fonts.size(20)
  },
  line: {
    height: getRH(1),
    backgroundColor: Colors.LIGHTGRAY,
    marginVertical: getRH(10),
    marginHorizontal: getRW(20)
  }
})
