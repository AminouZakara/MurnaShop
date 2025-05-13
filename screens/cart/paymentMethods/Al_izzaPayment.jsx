import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const Al_izzaPayment = ({userData, cartItems, grandTotal, shippingCost}) => {

 
  return (
    <View>
           <PhonePaymentProp methodName={"Alizza"} color={"black"} userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />
        </View>
  )
}

export default Al_izzaPayment

const styles = StyleSheet.create({})