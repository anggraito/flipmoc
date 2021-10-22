import React, { useState } from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import { BG_SET } from '../../../helpers/globalStyles'
import { normalize } from '../../../helpers/scallingSize'

export default function TransactionList(){
  const [searchValue, setSearchValue] = useState('')

  return (
    <View style={{...BG_SET}}>
      <View style={{padding: 10, }}>
        <TextInput placeholder='Cari nama, bank, atau nominal'
        value={searchValue} onChangeText={(val) => setSearchValue(val)}
        style={{backgroundColor: 'pink', height: normalize(42), borderRadius: 8, paddingLeft: '10%', paddingRight: '30%'}} />
        <View style={{position: 'absolute', top: 21, left: 20}}>
          <Text style={{}}>ico</Text>
          
        </View>
        <TouchableOpacity style={{flexDirection: 'row', position: 'absolute', top: 21, right: 25}}>
          <Text>URUTKAN</Text>
          <Text>ico</Text>
        </TouchableOpacity>
        
      </View>

      <View>
        <View />
        <View>
          <Text>Nama Bank</Text>
          <Text>Nama Pengirim</Text>
          <View>
            <Text>Nama Bank</Text>
            <Text>=</Text>
            <Text>Tanggal</Text>
          </View>
        </View>
        <View>
          <Text>Status</Text>
        </View>
      </View>
    </View>
  )
}