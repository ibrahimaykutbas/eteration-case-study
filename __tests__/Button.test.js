import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import Button from '../src/components/Button'

describe('Button Component', () => {
  it('renders button text and calls onPress callback when pressed', () => {
    const mockOnPress = jest.fn()
    const { getByText } = render(<Button onPress={mockOnPress} title="Press" />)

    const buttonText = getByText('Press')
    expect(buttonText).toBeTruthy()

    fireEvent.press(buttonText)

    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })
})
