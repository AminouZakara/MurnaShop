import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Refunded = ({myOrders, errorOrders}) => {

  const refundedOrders = myOrders.filter((order) => order.status === "refunded");
  console.log("Refunded Orders", refundedOrders);
  console.log("Refunded Orders length", refundedOrders.length);

  return (
    <View>
      <Text>Produits remboursé</Text>
      <CommandeProps myOrders={refundedOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Refunded

const styles = StyleSheet.create({})