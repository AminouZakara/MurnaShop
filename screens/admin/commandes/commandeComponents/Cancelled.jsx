import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Cancelled = ({myOrders, errorOrders}) => {

  const cancelledOrders = myOrders.filter((order) => order.status === "cancelled");
  console.log("Cancelled Orders", cancelledOrders);
  console.log("Cancelled Orders length", cancelledOrders.length);
  console.log("Error Orders", errorOrders);
  return (
    <View>
      <Text>Produits annulé</Text>
      <CommandeProps myOrders={cancelledOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Cancelled

const styles = StyleSheet.create({})