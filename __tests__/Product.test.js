import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import Product from '../src/components/Product'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { setFavorites, setBasket } from '../src/redux/slice'

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

const mockStore = configureStore([])
let store

describe('Product Component', () => {
  const product = {
    createdAt: '2023-07-17T07:21:02.529Z',
    name: 'Bentley Focus',
    image: 'https://loremflickr.com/640/480/food',
    price: '51.00',
    description:
      'Quasi adipisci sint veniam delectus. Illum laboriosam minima dignissimos natus earum facere consequuntur eius vero. Itaque facilis at tempore ipsa. Accusamus nihil fugit velit possimus expedita error porro aliquid. Optio magni mollitia veritatis repudiandae tenetur nemo. Id consectetur fuga ipsam quidem voluptatibus sed magni dolore.\nFacilis commodi dolores sapiente delectus nihil ex a perferendis. Totam deserunt assumenda inventore. Incidunt nesciunt adipisci natus porro deleniti nisi incidunt laudantium soluta. Nostrum optio ab facilis quisquam.\nSoluta laudantium ipsa ut accusantium possimus rem. Illo voluptatibus culpa incidunt repudiandae placeat animi. Delectus id in animi incidunt autem. Ipsum provident beatae nisi cumque nulla iure.',
    model: 'CTS',
    brand: 'Lamborghini',
    id: '1'
  }

  beforeEach(() => {
    store = mockStore({
      slice: {
        basket: [],
        favorites: []
      }
    })
    store.clearActions()
  })

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Product product={product} />
      </Provider>
    )

    expect(getByText('Bentley Focus')).toBeTruthy()

    expect(getByText('51.00 ₺')).toBeTruthy()

    expect(getByTestId('product-image')).toBeTruthy()
  })

  it('handles add to favorites', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Product product={product} />
      </Provider>
    )

    fireEvent.press(getByTestId('favorite-button'))

    const actions = store.getActions()

    expect(actions).toContainEqual(setFavorites(product))
  })

  it('handles add to basket', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Product product={product} />
      </Provider>
    )

    fireEvent.press(getByTestId('button'))

    const actions = store.getActions()

    expect(actions).toContainEqual(setBasket({ product, type: 'add' }))
  })
})
