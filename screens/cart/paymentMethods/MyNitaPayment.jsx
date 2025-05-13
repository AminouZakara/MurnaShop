import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const MyNitaPayment = ({userData, cartItems, grandTotal, shippingCost}) => {
  return (
    <View>
      <PhonePaymentProp methodName={"MyNita"} color={"#ECA191"} userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />
    </View>
  )
}

export default MyNitaPayment

const styles = StyleSheet.create({})