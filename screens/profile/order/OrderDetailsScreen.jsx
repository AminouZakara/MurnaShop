import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import SimilarProducts from '../../home/productDetails/SimilarProducts';
import FemmeProducts from '../../../components/home/categories/femmeProducts/FemmeProducts';
import AllProducts from '../../../components/home/categories/allProducts/AllProducts';



const OrderDetailsScreen = () => {
  const navigation = useNavigation()
  const order = navigation.getState().routes[navigation.getState().index].params.order;
  console.log("order details", order);
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => (<View
        style={{ marginLeft: 30 }}
      >
        <Text style={{ color: "#FF9900", fontSize: 18 }}>Détails de la Commande</Text>
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
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}>
        {order.cartItems.map((item, index) => (
          <View key={index}>
            <View style={styles.orderDetails}>
              <Text style={{ color: "grey", marginBottom: 2 }} >Numéro de Commande : <Text style={styles.orderItemText}> {order.checkoutBatchId}</Text></Text>
              <Text style={{ color: "grey", marginBottom: 2 }} >Date de Commande : <Text style={styles.orderItemText}>{order.orderDate.toDate().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}</Text> </Text>
              <View style={{ marginTop: 2, }}>
                {order.status === "pending" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ color: "#FF9900", fontSize: 14, fontWeight: "500" }}>En attente</Text></Text>

                )}
                {order.status === "cancelled" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ color: "red", fontSize: 14, fontWeight: "500" }}>Annulé</Text></Text>
                )}
                {order.status === "confirmed" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ fontWeight: "500", color: "green", fontSize: 14 }}>Confirmé</Text></Text>
                )}
                {order.status === "shipped" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ fontWeight: "500", color: "blue", fontSize: 14 }}>Expédié</Text></Text>
                )}
                {order.status === "delivered" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ marginLeft: 8, fontWeight: "800", color: "green", fontSize: 16 }}>Livré</Text></Text>
                )}
                {order.status === "returned" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ fontWeight: "500", color: "red", fontSize: 14 }}>Retourné</Text></Text>
                )}
                {order.status === "refunded" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ fontWeight: "500", color: "red", fontSize: 14 }}>Remboursé</Text></Text>
                )}

                {order.status === "failed" && (
                  <Text style={{ color: "grey", marginBottom: 2 }}  >Statut : <Text style={{ fontWeight: "500", color: "red", fontSize: 14 }}>Échoué</Text></Text>
                )}




              </View>
              <Text style={{ color: "grey", marginBottom: 2 }} >Prix Total : <Text style={styles.orderItemText}>{order.grandTotal} FCFA</Text></Text>
            </View>
            {/* product details */}
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 15,
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 8,
                elevation: 2,
                shadowColor: '#000',
              }}>
              <View key={index} style={{ flexDirection: "row", }}>
                <TouchableOpacity
                  onPress={
                    () => navigation.navigate('ProductDetails', {
                      productTitle: item.name,
                      product: order,
                      id: item.productId,
                    })
                  }
                  style={{ width: "30%" }}>
                  <Image source={{ uri: order.productImage }} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 6, width: "70%", }}>
                  <Text style={styles.orderItemText}>{item.name}</Text>
                  <Text style={styles.orderItemText}> {item.quantity} </Text>
                  <Text style={styles.orderItemText}> {item.price} FCFA</Text>
                  {order.status === "delivered" && (
                    <View style={{ marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("ReviewProductScreen", { orderId: order.id })}
                        style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 4, paddingVertical: 2, borderRadius: 5, borderWidth: 1, borderColor: "#FF9900" }}>
                        <Entypo name="star" size={20} color="#FF9900" />
                        <Text style={{ color: "black", fontSize: 14, fontWeight: "600" }}>Laisser un avis</Text>
                      </TouchableOpacity>
                    </View>

                  )}
                </View>

              </View>
            </View>

            {order.status !== "cancelled" && (
              <>
                {/* Info d'adresse de livraison */}

                <View style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 8, elevation: 2, shadowColor: '#000', }}>
                  <View style={{ paddingTop: 6, flexDirection: "row", alignItems: "center", }}>
                    <Entypo name="location-pin" size={24} color="#FF9900" />
                    <Text style={styles.orderItemText}>Info d'adresse de livraison </Text>
                  </View>
                  <View style={{ padding: 10, }}>
                    <Text style={{ color: "grey", marginBottom: 2 }} >Nom du Destinataire : <Text style={styles.orderItemText}>{order.userName}</Text></Text>
                    <Text style={{ color: "grey", marginBottom: 2 }} >Numéro de Commande : <Text style={styles.orderItemText}>{order.checkoutBatchId}</Text></Text>
                    <Text style={{ color: "grey", marginBottom: 2 }} >Adresse de Livraison : <Text style={styles.orderItemText}>
                      {item.userNeighborhood}, {item.userTown}</Text></Text>
                    <Text style={styles.orderItemText}>{item.userCity} / {item.userRegion}</Text>
                    <Text style={{ color: "grey", marginBottom: 2 }} >Numéro de Téléphone : <Text style={styles.orderItemText}>{order.userPhoneNumber}</Text></Text>
                  </View>
                </View>

                {/* Info de payement */}

                <View style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 8, elevation: 2, shadowColor: '#000', }}>
                  <View style={{ paddingHorizontal: 8, paddingTop: 6, flexDirection: "row", alignItems: "center", }}>
                    <Entypo name="credit-card" size={24} color="#FF9900" />
                    <Text style={{
                      marginLeft: 8,
                      marginTop: 4,
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#333',
                    }}>Info de payement </Text>
                  </View>
                  <View style={{ padding: 10, }}>
                    <Text style={{ color: "grey", marginBottom: 2 }} >Mode de Payement : <Text style={styles.orderItemText}>{order.paymentMethod}</Text></Text>
                    <Text style={{ color: "grey", marginBottom: 2 }} >Nom : <Text style={styles.orderItemText}>{order.orderPaymentInfo.name}</Text></Text>
                    <Text style={{ color: "grey", marginBottom: 2 }} >Prénom : <Text style={styles.orderItemText}>{order.orderPaymentInfo.surname}</Text></Text>
                    {/* show the first 4 digits of the card number */}
                    <Text style={{ color: "grey", marginBottom: 2 }} >Numéro de Téléphone : <Text style={styles.orderItemText}>{order.orderPaymentInfo.phone.slice(-2)} ** ** {order.userPhoneNumber.slice(-2)}</Text></Text>
                    <View style={{ marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <Text style={{ color: "grey", marginBottom: 2 }} >Montant Total : </Text>
                      <Text style={{
                        marginTop: 4,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#FF9900',
                      }}>{order.grandTotal} FCFA</Text>
                    </View>
                  </View>
                </View>
              </>
            )}


            {/* Distance sales contract */}
            <TouchableOpacity style={{ marginTop: 10, backgroundColor: "lightgrey", borderRadius: 8, elevation: 2, shadowColor: '#000', }}>
              <View style={{ paddingHorizontal: 8, paddingTop: 6, flexDirection: "row", alignItems: "center", }}>
                <Entypo name="file-text" size={24} color="#FF9900" />
                <Text style={{
                  marginLeft: 8,
                  marginVertical: 4,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'darkblue',
                }}>Contrat de vente à distance </Text>
              </View>
            </TouchableOpacity>


            {/** Similar products */}
            <View style={{
              marginVertical: 15,
              backgroundColor: '#fff',
              padding: 8,
              borderRadius: 8,
              elevation: 2,
              shadowColor: '#000',
            }}>
              <Text style={styles.orderItemText}> Produits similaires</Text>
              <SimilarProducts productType={item.productType} id={item.productId} />

            </View>


          </View>

        ))}
      </ScrollView>
    </View>

  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  orderDetails: {
    marginBottom: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderItemText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

})