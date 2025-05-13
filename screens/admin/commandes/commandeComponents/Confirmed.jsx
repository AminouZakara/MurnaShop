import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Confirmed = ({myOrders, errorOrders}) => {

  const confirmedOrders = myOrders.filter((order) => order.status === "confirmed");
  console.log("Confirmed Orders", confirmedOrders);
  console.log("Confirmed Orders length", confirmedOrders.length);
  return (
    <View>
      <Text>Produits confirmé</Text>
      <CommandeProps myOrders={confirmedOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Confirmed

const styles = StyleSheet.create({})