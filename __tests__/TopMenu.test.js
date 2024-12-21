import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import TopMenu from '../src/components/TopMenu'

describe('TopMenu', () => {
  it('should render correctly', () => {
    const { queryByTestId } = render(
      <TopMenu
        leftTitle="Back"
        title="Title"
        rightTitle="Trash"
        onPressLeft={() => {}}
        onPressRight={() => {}}
        leftIcon="Back"
        rightIcon="Trash"
      />
    )

    const topMenu = queryByTestId('topMenu')
    expect(topMenu).not.toBeNull()
  })

  it('should call onPressLeft', () => {
    const onPressLeft = jest.fn()
    const { getByTestId } = render(
      <TopMenu
        leftTitle="Back"
        title="Title"
        rightTitle="Trash"
        onPressLeft={onPressLeft}
        onPressRight={() => {}}
        leftIcon="Back"
        rightIcon="Trash"
      />
    )

    fireEvent.press(getByTestId('leftButton'))
    expect(onPressLeft).toHaveBeenCalledTimes(1)
  })

  it('should call onPressRight', () => {
    const onPressRight = jest.fn()
    const { getByTestId } = render(
      <TopMenu
        leftTitle="Back"
        title="Title"
        rightTitle="Trash"
        onPressLeft={() => {}}
        onPressRight={onPressRight}
        leftIcon="Back"
        rightIcon="Trash"
      />
    )

    fireEvent.press(getByTestId('rightButton'))
    expect(onPressRight).toHaveBeenCalledTimes(1)
  })

  it('should render correctly without leftTitle and rightTitle', () => {
    const { queryByTestId } = render(
      <TopMenu
        title="Title"
        onPressLeft={() => {}}
        onPressRight={() => {}}
        leftIcon="Back"
        rightIcon="Trash"
      />
    )

    const topMenu = queryByTestId('topMenu')
    expect(topMenu).not.toBeNull()
  })
})
