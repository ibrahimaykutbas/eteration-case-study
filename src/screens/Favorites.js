import {
  SafeAreaView,
  View,
  StyleSheet,
  ActionSheetIOS,
  Platform,
  Appearance
} from 'react-native'
import React from 'react'

import Colors from '../theme/Colors'

import TopMenu from '../components/TopMenu'
import ProductList from '../components/ProductList'

import { useSelector, useDispatch } from 'react-redux'
import { clearAllFavorites } from '../redux/slice'

const Favorites = () => {
  const dispatch = useDispatch()

  const favorites = useSelector(state => state.slice.favorites)

  const handleClearAllFavorites = () => {
    if (Platform.OS == 'ios') {
      showActionSheet()
    } else {
      dispatch(clearAllFavorites())
    }
  }

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: Appearance.getColorScheme()
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          dispatch(clearAllFavorites())
        }
      }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Favorites"
        onPressRight={favorites.length > 0 ? handleClearAllFavorites : null}
        rightIcon="Trash"
      />

      <View style={styles.content}>
        <ProductList products={favorites} />
      </View>
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  content: {
    flex: 1
  }
})
