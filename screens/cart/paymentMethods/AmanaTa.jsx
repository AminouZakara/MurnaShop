import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const AmanaTa = ({userData, cartItems, grandTotal, shippingCost}) => {
  return (
    <View>
      <PhonePaymentProp methodName={"AmanaTa"} color={"orange"} userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost}  />
    </View>
  )
}

export default AmanaTa

const styles = StyleSheet.create({})