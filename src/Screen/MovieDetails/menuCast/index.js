import React from 'react'
import {
  ActionSheetIOS,
  AlertButton,
  Platform,
  TouchableOpacity,
} from 'react-native'
import {
  Menu as PopupMenu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'



export default function Menu({ children, options }) {
  function findButtonIndex(style) {
    const index = options.findIndex((option) => option.style === style)
    return index >= 0 ? index : undefined
  }

  return Platform.OS === 'ios' ? (
    <TouchableOpacity
      onPress={() => {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            cancelButtonIndex: findButtonIndex('cancel'),
            destructiveButtonIndex: findButtonIndex('destructive'),
            options: options.map((option) => option.text),
          },
          async (buttonIndex) => options[buttonIndex].onPress?.()
        )
      }}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <PopupMenu>
      <MenuTrigger>{children}</MenuTrigger>

      <MenuOptions>
        {options
          .filter((o) => o.style !== 'cancel')
          .map(({ onPress, text }) => (
            <MenuOption key={text} onSelect={onPress} text={text} />
          ))}
      </MenuOptions>
    </PopupMenu>
  )
}

