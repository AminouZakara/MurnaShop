import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardPayment = ({ userData, cartItems, grandTotal,shippingCost}) => {
  console.log("CardPayment userData", userData);
  console.log("CardPayment cartItems", cartItems);
  console.log("CardPayment grandTotal", grandTotal);
  return (
    <View>
      <Text>CardPayment</Text>
    </View>
  )
}

export default CardPayment

const styles = StyleSheet.create({})