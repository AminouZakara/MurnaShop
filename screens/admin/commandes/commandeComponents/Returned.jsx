import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Returned = ({myOrders, errorOrders}) => {

  const returnedOrders = myOrders.filter((order) => order.status === "returned");
  console.log("Error Orders", errorOrders);
  console.log("Returned Orders", returnedOrders);
  console.log("Returned Orders length", returnedOrders.length);

  return (
    <View>
      <Text>Produits retourné</Text>
      <CommandeProps myOrders={returnedOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Returned

const styles = StyleSheet.create({})