import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import Input from '../src/components/Input'

describe('Input Component', () => {
  it('renders input placeholder and calls onChangeText callback when text is entered', () => {
    const mockOnChangeText = jest.fn()
    const { getByPlaceholderText } = render(
      <Input onChangeText={mockOnChangeText} placeholder="Enter text" />
    )

    const input = getByPlaceholderText('Enter text')
    expect(input).toBeTruthy()

    fireEvent.changeText(input, 'Hello')

    expect(mockOnChangeText).toHaveBeenCalledTimes(1)
  })
})
