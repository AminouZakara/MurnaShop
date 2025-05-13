import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Delivered = ({myOrders, errorOrders}) => {

  const delivereddOrders = myOrders.filter((order) => order.status === "delivered");
  console.log("Delivered Orders", delivereddOrders);
  console.log("Delivered Orders length", delivereddOrders.length);

  return (
    <View>
      <Text>Produits delivré</Text>
      <CommandeProps myOrders={delivereddOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Delivered

const styles = StyleSheet.create({})