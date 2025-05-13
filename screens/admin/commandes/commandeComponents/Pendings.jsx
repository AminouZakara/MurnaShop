import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommandeProps from '../CommandeProps'

const Pendings = ({loadingOrders, myOrders, errorOrders}) => {

   // if loading is true, show a loading indicator
   if (loadingOrders) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Rechargement...</Text>
      </View>
    );
  }

  const pendingOrders = myOrders.filter((order) => order.status === "pending");
  console.log("Pending Orders", pendingOrders);
  console.log("Pending Orders length", pendingOrders.length);
  return (
    <View>
      <Text style={{marginLeft:8, fontSize: 14, fontWeight: "500", marginBottom: 10, color:"green" }}>Commandes en attente de confirmation</Text>
      <CommandeProps myOrders={pendingOrders} errorOrders={errorOrders} />
    </View>
  )
}

export default Pendings

const styles = StyleSheet.create({})