import { createSlice } from '@reduxjs/toolkit'

import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const favoritesValue = storage.getString('favorites')
const favorites = favoritesValue ? JSON.parse(favoritesValue) : []

const basketValue = storage.getString('basket')
const basket = basketValue ? JSON.parse(basketValue) : []

const initialState = {
  favorites,
  basket
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      const isExist = state.favorites.find(
        item => item.id === action.payload.id
      )

      if (isExist) {
        state.favorites = state.favorites.filter(
          item => item.id !== action.payload.id
        )
      } else {
        state.favorites.push(action.payload)
      }

      return storage.set('favorites', JSON.stringify(state.favorites))
    },
    clearAllFavorites: state => {
      state.favorites = []

      return storage.set('favorites', JSON.stringify(state.favorites))
    },
    setBasket: (state, action) => {
      const { product, type } = action.payload

      const isExist = state.basket.find(item => item.id === product.id)

      if (isExist) {
        if (type === 'minus') {
          if (isExist.count > 1) {
            state.basket = state.basket.map(item => {
              if (item.id === product.id) {
                item.count -= 1
              }

              return item
            })
          } else {
            state.basket = state.basket.filter(item => item.id !== product.id)
          }
        } else {
          state.basket = state.basket.map(item => {
            if (item.id === product.id) {
              item.count += 1
            }

            return item
          })
        }
      } else {
        state.basket.push({ ...product, count: 1 })
      }

      return storage.set('basket', JSON.stringify(state.basket))
    }
  }
})

export const { setFavorites, clearAllFavorites, setBasket } = slice.actions

export default slice.reducer
