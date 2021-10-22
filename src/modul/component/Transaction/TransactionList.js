import React, { useState } from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import { BG_SET, Font12, Font13, Font14, Font16, ITEM_CENTER, WHITE } from '../../../helpers/globalStyles'
import { normalize } from '../../../helpers/scallingSize'

export default function TransactionList(){
  const [searchValue, setSearchValue] = useState('')

  return (
    <View style={{flex: 1}}>
      
      <View style={{paddingHorizontal: 8, paddingVertical: 15 }}>
        <TextInput placeholder='Cari nama, bank, atau nominal'
        value={searchValue} onChangeText={(val) => setSearchValue(val)}
        style={{backgroundColor: 'pink', height: normalize(62), borderRadius: 8, paddingLeft: '10%', paddingRight: '30%'}} />
        <View style={{position: 'absolute', top: normalize(36), left: 20}}>
          <Text style={{}}>ico</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', position: 'absolute', top: normalize(36), right: 25}}>
          <Text>URUTKAN</Text>
          <Text>ico</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 8}}>
        <View style={{backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8}}>
          <View style={{flexDirection: 'row', ...ITEM_CENTER}}>
            <View style={{width: 8, backgroundColor: 'pink', height: normalize(98), marginRight: 20, borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}/>
            <View style={{marginVertical: 15}}>
              <Text style={Font16('Montserrat-Bold')}>Dari Bank - Untuk</Text>
              <Text style={Font14('Montserrat-Bold')}>{'Nama Pengirim'.toUpperCase()}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={Font13('OpenSans-Regular')}>Nama Bank</Text>
                <Text>=</Text>
                <Text style={Font13('OpenSans-Regular')}>Tanggal</Text>
              </View>
            </View>
          </View>
          
          <View style={{...ITEM_CENTER, marginRight: 15}}>
            <View style={{backgroundColor: 'yellow', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8}}>
              <Text style={Font12('OpenSans-Bold')}>Status</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}