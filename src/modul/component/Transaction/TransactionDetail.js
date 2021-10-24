import React, { useRef, useState } from 'react'
import {View, Text, StyleSheet, Animated} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Clipboard from '@react-native-clipboard/clipboard'
import IconAn from 'react-native-vector-icons/AntDesign'
import IconFe from 'react-native-vector-icons/Feather'

import { BORDERLINE, DARKSLATE, Font12, Font13, Font14, Font16, ORANGE_TOMATO, WHITE } from '../../../helpers/globalStyles'
import { capitalizeFirstLetter, convertDate, priceSeparator } from '../../../helpers/validator'
import HeaderNav from '../../fragment/header'
import { showToast } from '../../fragment/toast'

export default function TransactionDetail({navigation, route}) {
  const {itemDetail} = route.params
  const [openView, setOpenView] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) setTimeout(() => {
        fadeOut()
      }, 500)
    })
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <HeaderNav colorStatus={WHITE} navigation={navigation} title='Detail Transaksi' />
      <View style={{backgroundColor: WHITE, marginTop: 10}}>
        <View style={{borderBottomWidth: 0.8, borderColor: BORDERLINE, padding: 20, flexDirection: 'row' }}>
          <Text style={Font14('Roboto-Bold')}>ID TRANSAKSI: #{itemDetail.id}</Text>
          <TouchableOpacity onPress={() => {Clipboard.setString(itemDetail.id);fadeIn()}}>
            <IconFe name='copy' size={14} style={{marginLeft: 10}} />
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 0.8, borderColor: BORDERLINE, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={Font14('Roboto-Bold')}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity onPress={() => setOpenView(!openView)}>
            <Text style={Font12('Roboto-SemiBold', ORANGE_TOMATO)}>{openView ? "Tutup":"Buka"}</Text>
          </TouchableOpacity>
        </View>
        {openView && <View style={{padding: 20}}>

          <View style={{flexDirection: 'row', paddingBottom: 15}}>
            <Text style={Font16('Roboto-Bold')}>{itemDetail.sender_bank.length <= 4 ? itemDetail.sender_bank.toUpperCase() : capitalizeFirstLetter(itemDetail.sender_bank) }</Text>
            <IconAn name='arrowright' size={18} />
            <Text style={Font16('Roboto-Bold')}>{itemDetail.beneficiary_bank.length <= 4 ? itemDetail.beneficiary_bank.toUpperCase() : capitalizeFirstLetter(itemDetail.beneficiary_bank)}</Text>
          </View>

          <View style={styles.detailWrap}>
            <View style={{flex: 1}}>
              <Text style={styles.titleDetail}>- {itemDetail.beneficiary_name.toUpperCase()}</Text>
              <Text style={styles.fieldDetail}>{itemDetail.account_number}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.titleDetail}>NOMINAL</Text>
              <Text style={styles.fieldDetail}>Rp{priceSeparator(itemDetail.amount)}</Text>
            </View>
          </View>

          <View style={styles.detailWrap}>
            <View style={{flex: 1}}>
              <Text style={styles.titleDetail}>BERITA TRANSFER</Text>
              <Text style={styles.fieldDetail}>{itemDetail.account_number}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.titleDetail}>KODE UNIK</Text>
              <Text style={styles.fieldDetail}>{itemDetail.unique_code}</Text>
            </View>
          </View>

          <View style={{paddingBottom: 20}}>
            <Text style={styles.titleDetail}>WAKTU DIBUAT</Text>
            <Text style={styles.fieldDetail}>{convertDate(itemDetail.created_at)}</Text>
          </View>

        </View>}
      </View>
      <Animated.View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: DARKSLATE, padding: 20, opacity: fadeAnim}}>
        <Text style={Font13('Roboto-Regular', WHITE)}>Berhasil disalin</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailWrap: {flexDirection: 'row', paddingBottom: 20},
  titleDetail: {...Font14('Roboto-Bold'), paddingBottom: 4},
  fieldDetail: Font14('Roboto-SemiBold'),

})