import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from 'react-redux';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';



const MyOrder = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => (<View
        style={{ marginLeft: 30 }}
      >
        <Text style={{ color: "#FF9900", fontSize: 18 }}>Mes Commandes</Text>
      </View>),
      headerStyle: {
        backgroundColor: "white",
        borderBottomColor: "transparent",
        shadowColor: "transparent"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, }}>
          <Icon name="arrow-back" size={24} color="#FF9900" />
        </TouchableOpacity>
      ),


    });
  }, [navigation]);

  //get user data from redux
  const { userData, loading, error } = useSelector(state => state.user);
  const userId = userData?.userId;
  //console.log("userData", userData);
  const [myOrders, setMyOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);
  const getMyOrders = async () => {
    setLoadingOrders(true);
    setErrorOrders(null);
    try {
      // get the userId from the userData
      const orders = await getDocs(query(collection(db, "murnaShoppingOrders"), where("userId", "==", userId), orderBy('orderDate', 'desc')));
      // set the orders to the state
      setMyOrders(orders.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoadingOrders(false);
    }
    catch (error) {
      console.log("error", error);
      setErrorOrders(error);
    }
    finally {
      setLoadingOrders(false);
    }
  }
  useLayoutEffect(() => {
    getMyOrders();
  }, []);
  // if loading is true, show a loading indicator
  if (loadingOrders) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }


  console.log("myOrders", myOrders);

  // query(collection(db, "MurnaShoppingOrders"), where("userId", "==", currentUser.uid))
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      {myOrders.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Aucune commande trouvée</Text>
        </View>
      ) : (
        myOrders.map((order) => (
          <View key={order.id}>
            {order.cartItems.map((cartItem) => (
              <View key={cartItem.productId} style={{ margin: 6, backgroundColor: "white", elevation: 0.2, padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {order.orderDate.toDate().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Text>
                    <Text style={{ marginTop: 4, color: "#FF9900", fontSize: 14 }}><Text style={{ color: "black", fontWeight: "400", fontSize: 16 }}>Prix: </Text>{order.totalAmount} FCFA</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("OrderDetailsScreen", {
                      orderId: order.id,
                      order: order,
                    })}

                      style={{ flexDirection: "row", alignItems: "center", padding: 5, borderRadius: 5, marginLeft: 10 }}>
                      <Text style={{ color: "#FF9900", fontSize: 14, fontWeight: "600" }}>Détails</Text>
                      <AntDesign name="caretright" size={16} color="#FF9900" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ borderBottomWidth: 0.4, borderColor: "grey" }} />
                <View style={{ marginTop: 15, }}>
                  {order.status === "pending" && (
                    <Text style={{ position: 'absolute', top: 0, right: 0, color: "#FF9900", fontSize: 14, fontWeight: "500" }}>En attente</Text>
                  )}
                  {order.status === "canceled" && (
                    <Text style={{ position: 'absolute', top: 0, right: 0, color: "red", fontSize: 14, fontWeight: "500" }}>Annulé</Text>
                  )}
                  {order.status === "confirmed" && (
                    <Text style={{ position: 'absolute', top: 0, right: 0, fontWeight: "500", color: "green", fontSize: 14 }}>Confirmé</Text>
                  )}
                  {order.status === "shipped" && (
                    <Text style={{ position: 'absolute', top: 0, right: 0, fontWeight: "500", color: "blue", fontSize: 14 }}>Expédié</Text>
                  )}
                  {order.status === "delivered" && (
                    <View style={{ marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons name="done" size={20} color="green" />
                        <Text style={{ marginLeft: 8, fontWeight: "800", color: "green", fontSize: 16 }}>Livré</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => navigation.navigate("ReviewProductScreen", {
                          orderId: order.id,
                          order: order,
                          productId: cartItem.productId,
                        })}
                        style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 4, paddingVertical: 2, borderRadius: 5, borderWidth: 1, borderColor: "#FF9900", marginLeft: 10 }}>
                        <Entypo name="star" size={20} color="#FF9900" />
                        <Text style={{ marginLeft: 6, color: "black", fontSize: 14, fontWeight: "600" }}>Laisser un avis</Text>
                      </TouchableOpacity>
                    </View>

                  )}
                  {order.status === "returned" && (
                    <Text style={{ position: 'absolute', top: 0, right: 0, fontWeight: "500", color: "red", fontSize: 14 }}>Retourné</Text>
                  )}
                  {order.status === "refunded" && (
                    <Text style={{ position: 'absolute', top: 0, right: 0, fontWeight: "500", color: "red", fontSize: 14 }}>Remboursé</Text>
                  )}

                  {order.status === "failed" && (
                    <Text style={{ position: 'absolute', top: 0, right: 0, fontWeight: "500", color: "red", fontSize: 14 }}>Échoué</Text>
                  )}

                  <View>
                    <Image
                      source={{ uri: order.productImage }}
                      style={{ width: 60, height: 60, borderRadius: 4 }}
                    />
                  </View>


                </View>

              </View>
            ))}
          </View>
        ))
      )}
      {errorOrders && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Error: {errorOrders.message}</Text>
        </View>
      )}


    </ScrollView>
  )
}

export default MyOrder

const styles = StyleSheet.create({

})