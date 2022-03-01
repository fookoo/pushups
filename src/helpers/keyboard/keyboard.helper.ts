import { KeyboardEvent } from 'react'

export enum KeyEnum {
  Enter = 'Enter',
  Esc = 'Escape'
}

type KeyboardCapableElements = HTMLDivElement | HTMLInputElement | HTMLTextAreaElement

export type KeyEvent<T> = (event: KeyboardEvent<T>) => void

export class KeyboardHelper {
  public static onKeyPressedFactory<T = KeyboardCapableElements>(key: KeyEnum) {
    return (callback?: KeyEvent<T>) =>
      (event: KeyboardEvent<T>): void => {
        if (event.key === key) {
          callback?.(event)
        }
      }
  }

  /**
   * Method that gives you callback on keyboard
   * event and do the filtering for you, so you
   * can assign action for onEnter easier
   * @param callback
   */
  public static onEnterFactory<T = KeyboardCapableElements>(
    callback: (event: KeyboardEvent<T>) => void
  ): (event: KeyboardEvent<T>) => void {
    return KeyboardHelper.onKeyPressedFactory<T>(KeyEnum.Enter)(callback)
  }
}
