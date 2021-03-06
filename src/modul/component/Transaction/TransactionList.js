import React, { useEffect, useState } from 'react'
import {View, Text, TextInput, TouchableOpacity, Modal, FlatList, ActivityIndicator, StyleSheet, RefreshControl} from 'react-native'
import IconFa from 'react-native-vector-icons/FontAwesome'
import IconAn from 'react-native-vector-icons/AntDesign'
import IconFe from 'react-native-vector-icons/Feather'
import { useSelector, useDispatch } from 'react-redux'

import { Font13, Font14, Font16, ITEM_CENTER, WHITE, OPACITY_BLACK_5, SCREEN_HEIGHT,  
  MEDIUM_SEAGREEN, ORANGE_TOMATO, DARKSLATE, Font10, LIGHTLATE} from '../../../helpers/globalStyles'
import { capitalizeFirstLetter, convertDate, priceSeparator } from '../../../helpers/validator'
import { normalize } from '../../../helpers/scallingSize'

export default function TransactionList({navigation}){
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loadList, setLoadList] = useState(true)
  const [listData, setListData] = useState([])
  const [sortIdx, setSortIdx] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

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
    if (Object.values(transaction.data).length > 0) {
      setLoadList(false);setRefreshing(false)
    }
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

  console.log('-----', transaction.isFound, transaction.isLoading, Object.keys(transaction.data).length)

  const sortItem = (valSort) => {
    var newArr = []
    var arr = Object.values(transaction.data)
    if (valSort == 1) newArr = arr.sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name))
    else if (valSort == 2) newArr = arr.sort((a, b) => b.beneficiary_name.localeCompare(a.beneficiary_name))
    else if (valSort == 3) newArr = arr.sort((a, b) => a.created_at.localeCompare(b.created_at))
    else if (valSort == 4) newArr = arr.sort((a, b) => b.created_at.localeCompare(a.created_at))
    else newArr=arr
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

  const _onRefresh = () => {
    setRefreshing(true)
    listTransactionAPI()
  };

  return (
    <View style={{flex: 1}}>
      {/* <HeaderNav colorStatus={WHITE} /> */}
      <View style={styles.inputWrap}>
        <TextInput placeholder='Cari nama, bank, atau nominal'
        value={searchValue} onChangeText={(val) => changeValueSearch(val)}
        style={styles.inputBox} />
        <View style={{position: 'absolute', left: 18}}>
          <IconFe name='search' size={20} color={LIGHTLATE} />
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.buttonSort}>
          <Text style={Font13('OpenSans-Bold', ORANGE_TOMATO)}>
            {sortIdx == 1 ? 'Nama A-Z' : sortIdx == 2 ? 'Nama Z-A' : sortIdx == 3 ? 'Tanggal Terbaru' : sortIdx == 4 ? 'Tanggal Terlama' : 'URUTAN' }</Text>
          <IconFe name='chevron-down' size={22} color={ORANGE_TOMATO} />
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 8, flex: 1}}>
        { transaction.isLoading || loadList ? <ActivityIndicator size="small" color={ORANGE_TOMATO} />
        : transaction.isFound && Object.keys(transaction.data).length > 0 ? 
        <FlatList data={listData} refreshing={refreshing} 
        onRefresh={_onRefresh}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => 
          <TouchableOpacity key={index} onPress={() => navigation.navigate('TransactionDetailScreen', {itemDetail: item})}
          style={[{backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, marginVertical: 5},
          listData.length-1 === index && {marginBottom: 25}]}>
            <View style={styles.itemWrap}>
              <View style={[{width: 8, backgroundColor: MEDIUM_SEAGREEN, height: normalize(98), marginRight: 20, borderTopLeftRadius: 8, borderBottomLeftRadius: 8},
              item.status.toUpperCase() == 'PENDING' && {backgroundColor: ORANGE_TOMATO}]}/>
              <View style={{marginVertical: 15, flex: 1, marginRight: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={Font16('Roboto-Bold')}>{item.sender_bank.length <= 4 ? item.sender_bank.toUpperCase() : capitalizeFirstLetter(item.sender_bank) }</Text>
                  <IconAn name='arrowright' size={18} />
                  <Text style={Font16('Roboto-Bold')}>{item.beneficiary_bank.length <= 4 ? item.beneficiary_bank.toUpperCase() : capitalizeFirstLetter(item.beneficiary_bank)}</Text>
                </View>
                <Text style={Font14('Roboto-Bold')} numberOfLines={1}>{item.beneficiary_name.toUpperCase()}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={Font14('OpenSans-Regular')}>Rp {priceSeparator(item.amount)}</Text>
                  <IconFa name='circle' size={7} style={{paddingHorizontal: 3}} />
                  <Text style={Font14('OpenSans-Regular')}>{convertDate(item.completed_at)}</Text>
                </View>
              </View>
            </View>
            
            <View style={{...ITEM_CENTER, marginRight: 15}}>
              <View style={[{backgroundColor: MEDIUM_SEAGREEN, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8},
                item.status.toUpperCase() == 'PENDING' && {backgroundColor: WHITE, borderWidth: 0.8, borderColor: ORANGE_TOMATO, borderRadius: 8}]}>
                <Text style={Font10('OpenSans-Bold', item.status.toUpperCase() == 'PENDING' ? DARKSLATE :  WHITE )}>{item.status == 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        } />
      : <View style={ITEM_CENTER}>
          <Text>Tidak ada data tersedia</Text>
        </View>}
      </View>

      <Modal transparent visible={showModal}>
        <TouchableOpacity onPress={() => setShowModal(false)}
        style={{flex: 1, backgroundColor: OPACITY_BLACK_5, ...ITEM_CENTER}}>
          <View style={{backgroundColor: WHITE, height: SCREEN_HEIGHT/2, width: SCREEN_HEIGHT/2, borderRadius: 8, padding: 15 }}>
            {filterMenu.map((item, idx) => 
              <TouchableOpacity key={idx} onPress={() => pressSort(idx)}
              style={{flexDirection: 'row', marginVertical: 20}}>
                <View style={{borderRadius: 50, borderColor: ORANGE_TOMATO, borderWidth: 0.8, width: normalize(18), height: normalize(18), ...ITEM_CENTER, marginRight: 10}}>
                  {sortIdx == idx && <View style={{backgroundColor: ORANGE_TOMATO, width: normalize(12), height: normalize(12), borderRadius: 50 }} />}
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
const styles = StyleSheet.create({
  inputWrap: {paddingHorizontal: 8, paddingVertical: 15, justifyContent: 'center'},
  inputBox: {backgroundColor: WHITE, height: normalize(62), borderRadius: 8, paddingLeft: '10%', paddingRight: '30%'},
  buttonSort: {position: 'absolute', right: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'},
  itemWrap: {flexDirection: 'row', ...ITEM_CENTER, flex: 1}
})