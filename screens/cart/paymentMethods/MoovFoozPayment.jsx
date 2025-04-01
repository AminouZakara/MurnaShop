import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const MoovFoozPayment = () => {
  return (
    <View>
      <PhonePaymentProp methodName={"Moov Fooz"} color={"#9ACD32"} />
    </View>
  )
}

export default MoovFoozPayment

const styles = StyleSheet.create({})