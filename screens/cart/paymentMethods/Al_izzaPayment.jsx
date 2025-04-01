import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const Al_izzaPayment = () => {


 
  return (
    <View>
           <PhonePaymentProp methodName={"Alizza"} color={"black"} />
        </View>
  )
}

export default Al_izzaPayment

const styles = StyleSheet.create({})