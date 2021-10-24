import React from 'react'
import {View, Text} from 'react-native'
import { BORDERLINE, WHITE } from '../../../helpers/globalStyles'
import { convertDate, priceSeparator } from '../../../helpers/validator'
import HeaderNav from '../../fragment/header'

export default function TransactionDetail({navigation, route}) {
  console.log('------itemDetail', route.params.itemDetail)
  const {itemDetail} = route.params
  return (
    <View>
      <HeaderNav colorStatus={WHITE} navigation={navigation} />
      <View style={{backgroundColor: WHITE, marginTop: 10}}>
        <View style={{borderBottomWidth: 0.8, borderColor: BORDERLINE, padding: 20, flexDirection: 'row' }}>
          <Text>ID TRANSAKSI: #{itemDetail.id}</Text>
          <Text>icon</Text>
        </View>
        <View style={{borderBottomWidth: 0.8, borderColor: BORDERLINE, padding: 20, flexDirection: 'row' }}>
          <Text>DETAIL TRANSAKSI</Text>
          <Text>Tutup</Text>
        </View>
        <View style={{padding: 20, }}>
          <View>
            <Text>{itemDetail.sender_bank}</Text>
            <Text>icon</Text>
            <Text>{itemDetail.beneficiary_bank}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text>- {itemDetail.beneficiary_name.toUpperCase()}</Text>
              <Text>{itemDetail.account_number}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>NOMINAL</Text>
              <Text>Rp{priceSeparator(itemDetail.amount)}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text>BERITA TRANSFER</Text>
              <Text>{itemDetail.account_number}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>KODE UNIK</Text>
              <Text>{itemDetail.unique_code}</Text>
            </View>
          </View>

          <View>
            <Text>WAKTU DIBUAT</Text>
            <Text>{convertDate(itemDetail.created_at)}</Text>
          </View>

        </View>
      </View>
    </View>
  )
}