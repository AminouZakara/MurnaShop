import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Processing = ({myOrders, errorOrders}) => {

  const processingOrders = myOrders.filter((order) => order.status === "confirmed" );
  console.log("Processing Orders", processingOrders);
  console.log("Processing Orders length", processingOrders.length);

  return (
    <View>
      <Text>Produits en cours de traitement</Text>
      <CommandeProps myOrders={processingOrders} errorOrders={errorOrders} />
    </View>
  )
}
export default Processing

const styles = StyleSheet.create({})