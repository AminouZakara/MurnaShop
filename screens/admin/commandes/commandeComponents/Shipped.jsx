import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Shipped = ({myOrders, errorOrders}) => {

  const shippedOrders = myOrders.filter((order) => order.status === "shipped");
  console.log("Shipped Orders", shippedOrders);
  console.log("Shipped Orders length", shippedOrders.length);

  return (
    <View>
      <Text>Produits expédié</Text>
      <CommandeProps myOrders={shippedOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Shipped

const styles = StyleSheet.create({})