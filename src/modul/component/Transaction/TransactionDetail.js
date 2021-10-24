import React from 'react'
import {View, Text} from 'react-native'
import { WHITE } from '../../../helpers/globalStyles'
import HeaderNav from '../../fragment/header'

export default function TransactionDetail({navigation}) {
  return (
    <View>
      <HeaderNav colorStatus={WHITE} navigation={navigation} />
      
    </View>
  )
}