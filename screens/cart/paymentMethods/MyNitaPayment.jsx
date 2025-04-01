import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const MyNitaPayment = () => {
  return (
    <View>
      <PhonePaymentProp methodName={"MyNita"} color={"#ECA191"} />
    </View>
  )
}

export default MyNitaPayment

const styles = StyleSheet.create({})