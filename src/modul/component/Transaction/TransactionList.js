import React, { useEffect, useState } from 'react'
import {View, Text, TextInput, TouchableOpacity, Modal, FlatList, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { Font12, Font13, Font14, Font16, ITEM_CENTER, WHITE, OPACITY_BLACK_5, 
  SCREEN_HEIGHT } from '../../../helpers/globalStyles'
import { normalize } from '../../../helpers/scallingSize'
import { convertDate, priceSeparator } from '../../../helpers/validator'
// import actionsAPI from '../../../redux/actions/transaction'
// import { searchItem } from './logicTransaction'

export default function TransactionList({navigation}){
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loadList, setLoadList] = useState(true)
  const [listData, setListData] = useState([])
  const [sortIdx, setSortIdx] = useState(0)

  const {transaction} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    listTransactionAPI()
  }, [])

  function listTransactionAPI() {
    dispatch({type: 'LIST_TRANSACTION'}), [dispatch]
  }

  useEffect(() => {
    setListData(Object.values(transaction.data))
    if (Object.values(transaction.data).length > 0) setLoadList(false)
  }, [transaction.data])

  const changeValueSearch = (val) => {
    setLoadList(true)
    setSearchValue(val)
    searchItem(Object.values(transaction.data), val)
  }

  const searchItem = (arr, searchStr) => {
    let search = searchStr.toLowerCase();
  
    var newArr = arr.filter(elem => {
      return elem.beneficiary_name.toLowerCase().includes(search) || 
        elem.beneficiary_bank.toLowerCase().includes(search) || 
        elem.amount.toString().includes(search) ||
        elem.sender_bank.toLowerCase().includes(search)
    })
    setLoadList(false)
    setListData(newArr)
  }

  const sortItem = (valSort) => {
    var newArr = []
    var arr = Object.values(transaction.data)
    if (valSort == 1) newArr = arr.sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name))
    else if (valSort == 2) newArr = arr.sort((a, b) => b.beneficiary_name.localeCompare(a.beneficiary_name))
    else if (valSort == 3) newArr = arr.sort((a, b) => a.created_at.localeCompare(b.created_at))
    else if (valSort == 4) newArr = arr.sort((a, b) => b.created_at.localeCompare(a.created_at))
    setLoadList(false)
    setListData(newArr)
  }

  const pressSort = (idx) => {
    setSortIdx(idx)
    setTimeout(() => {
      setShowModal(false)
      sortItem(idx)
    },500)
  }

  return (
    <View style={{flex: 1}}>
      
      <View style={{paddingHorizontal: 8, paddingVertical: 15 }}>
        <TextInput placeholder='Cari nama, bank, atau nominal'
        value={searchValue} onChangeText={(val) => changeValueSearch(val)}
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

      <View style={{paddingHorizontal: 8, flex: 1}}>
        { loadList ? <ActivityIndicator size="small" color={'pink'} />
        : listData.length == 0 ? <Text>tidak ada data</Text>
        : <FlatList data={listData} 
        renderItem={({item, index}) => 
          <TouchableOpacity key={index} onPress={() => navigation.navigate('TransactionDetailScreen', {itemDetail: item})}
          style={{backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, marginVertical: 5}}>
            <View style={{flexDirection: 'row', ...ITEM_CENTER}}>
              <View style={{width: 8, backgroundColor: 'pink', height: normalize(98), marginRight: 20, borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}/>
              <View style={{marginVertical: 15}}>
                <Text style={Font16('Montserrat-Bold')}>{item.sender_bank} {item.beneficiary_bank}</Text>
                <Text style={Font14('Montserrat-Bold')}>{item.beneficiary_name.toUpperCase()}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={Font13('OpenSans-Regular')}>Rp {priceSeparator(item.amount+item.unique_code)}</Text>
                  <Text>=</Text>
                  <Text style={Font13('OpenSans-Regular')}>{convertDate(item.completed_at)}</Text>
                </View>
              </View>
            </View>
            
            <View style={{...ITEM_CENTER, marginRight: 15}}>
              <View style={{backgroundColor: 'yellow', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8}}>
                <Text style={Font12('OpenSans-Bold')}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        } />}
      </View>

      <Modal transparent visible={showModal}>
        <TouchableOpacity 
        style={{flex: 1, backgroundColor: OPACITY_BLACK_5, ...ITEM_CENTER}}>
          <View style={{backgroundColor: WHITE, height: SCREEN_HEIGHT/2, width: SCREEN_HEIGHT/2, borderRadius: 8, padding: 15 }}>
            {filterMenu.map((item, idx) => 
              <TouchableOpacity key={idx} onPress={() => pressSort(idx)}
              style={{flexDirection: 'row', marginVertical: 20}}>
                <View style={{borderRadius: 50, borderColor: 'pink', borderWidth: 0.8, width: normalize(18), height: normalize(18), ...ITEM_CENTER, marginRight: 10}}>
                  {sortIdx == idx && <View style={{backgroundColor: 'pink', width: normalize(12), height: normalize(12), borderRadius: 50 }} />}
                </View>
                <Text style={Font14('OpenSans-SemiBold')}>{item}</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const filterMenu = ['Urutkan', 'Nama A-Z', 'Nama Z-A', 'Tanggal Terbaru', 'Tanggal Terlama']