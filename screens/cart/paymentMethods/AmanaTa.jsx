import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhonePaymentProp from './PhonePaymentProp'

const AmanaTa = () => {
  return (
    <View>
      <PhonePaymentProp methodName={"AmanaTa"} color={"orange"} />
    </View>
  )
}

export default AmanaTa

const styles = StyleSheet.create({})