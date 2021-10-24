import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import { BG_SET, ITEM_CENTER,} from '../../helpers/globalStyles'
import { normalize } from '../../helpers/scallingSize'
import HeaderNav from '../fragment/header'

export default function SplaschScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('TransactionListScreen')
    }, 1000)
  })

  return (
    <View style={[BG_SET, ITEM_CENTER]}>
      <HeaderNav hidden />
      <Image source={{uri: `https://play-lh.googleusercontent.com/yWfRiFAZeUghsJ5vzfxuHJASF5jrMnNryUmBCl4AN3XbjR9IH3F5NB6KUMQYVduhXvo`}} style={{width: normalize(110), height: normalize(110)}}/>
    </View>
  )
}