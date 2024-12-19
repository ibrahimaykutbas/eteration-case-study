import { createSlice } from '@reduxjs/toolkit'

import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()
const favoritesValue = storage.getString('favorites')
const favorites = favoritesValue ? JSON.parse(favoritesValue) : []

const initialState = {
  favorites
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

      return storage.setString('favorites', JSON.stringify(action.payload))
    }
  }
})

export const { setFavorites } = slice.actions

export default slice.reducer
