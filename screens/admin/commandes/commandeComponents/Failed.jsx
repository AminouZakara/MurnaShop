import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps';

const Failed = ({myOrders, errorOrders}) => {

  const failedOrders = myOrders.filter((order) => order.status === "failed");
  console.log("Failed Orders", failedOrders);
  console.log("Failed Orders length", failedOrders.length);

  return (
    <View>
      <Text>Produits échoué</Text>
      <CommandeProps myOrders={failedOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Failed

const styles = StyleSheet.create({})