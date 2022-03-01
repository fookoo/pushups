import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { KeyboardHelper, KeyEnum } from './keyboard.helper'

interface IExampleProps {
  callback: (event: React.KeyboardEvent) => void
}
const ExampleComponent = ({ callback }: IExampleProps) => {
  const onEnter = KeyboardHelper.onKeyPressedFactory(KeyEnum.Enter)

  return (
    <div>
      <input onKeyDown={onEnter(callback)} />
    </div>
  )
}

describe('KeyboardHelper', () => {
  it('onKeyPressedFactory', () => {
    const spyFunction = jest.fn()
    render(<ExampleComponent callback={spyFunction} />)

    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(spyFunction).toBeCalled()

    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' })
    expect(spyFunction).toBeCalledTimes(1)
  })
})
