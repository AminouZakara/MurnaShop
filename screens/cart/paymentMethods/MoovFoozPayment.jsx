import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const MoovFoozPayment = ({userData, cartItems, grandTotal, shippingCost}) => {
  return (
    <View>
      <PhonePaymentProp methodName={"Moov Fooz"} color={"#9ACD32"} userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost}  />
    </View>
  )
}

export default MoovFoozPayment

const styles = StyleSheet.create({})