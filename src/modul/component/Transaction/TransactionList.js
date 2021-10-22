import React, { useEffect, useState } from 'react'
import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { Font12, Font13, Font14, Font16, ITEM_CENTER, WHITE, OPACITY_BLACK_5, 
  SCREEN_HEIGHT } from '../../../helpers/globalStyles'
import { normalize } from '../../../helpers/scallingSize'
import actionsAPI from '../../../redux/actions/transaction'

export default function TransactionList(){
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [listData, setListData] = useState([])

  const {transaction} = useSelector(state => state)
  const dispatch = useDispatch()
  console.log('transaction', transaction)

  useEffect(() => {
    listTransactionAPI()
  }, [])

  function listTransactionAPI() {
    dispatch(actionsAPI.getListTransaction())
    .then((res) => {
      if(res.status == 200) {
        //toast berhasil
        // list
        // input to redux
      }
      //handle error
      console.log('res', res)
    })
  }

  return (
    <View style={{flex: 1}}>
      
      <View style={{paddingHorizontal: 8, paddingVertical: 15 }}>
        <TextInput placeholder='Cari nama, bank, atau nominal'
        value={searchValue} onChangeText={(val) => setSearchValue(val)}
        style={{backgroundColor: 'pink', height: normalize(62), borderRadius: 8, paddingLeft: '10%', paddingRight: '30%'}} />
        <View style={{position: 'absolute', top: normalize(36), left: 20}}>
          <Text style={{}}>ico</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)}
        style={{flexDirection: 'row', position: 'absolute', top: normalize(36), right: 25}}>
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

      <Modal transparent visible={showModal}>
        <TouchableOpacity onPress={() => setShowModal(false)}
        style={{flex: 1, backgroundColor: OPACITY_BLACK_5, ...ITEM_CENTER}}>
          <View style={{backgroundColor: WHITE, height: SCREEN_HEIGHT/2, width: SCREEN_HEIGHT/2, borderRadius: 8, padding: 15 }}>
            {filterMenu.map((item, idx) => 
              <View key={idx} style={{flexDirection: 'row', marginVertical: 20}}>
                <View style={{borderRadius: 50, borderColor: 'pink', borderWidth: 0.8, width: normalize(18), height: normalize(18), ...ITEM_CENTER, marginRight: 10}}>
                  <View style={{backgroundColor: 'pink', width: normalize(12), height: normalize(12), borderRadius: 50 }} />
                </View>
                <Text style={Font14('OpenSans-SemiBold')}>{item}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const filterMenu = ['Urutkan', 'Nama A-Z', 'Nama Z-A', 'Tanggal Terbaru', 'Tanggal Terlama']