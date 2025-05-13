import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import CardPayment from './paymentMethods/CardPayment';
import Al_izzaPayment from './paymentMethods/Al_izzaPayment';
import AmanaTa from './paymentMethods/AmanaTa';
import MyNitaPayment from './paymentMethods/MyNitaPayment';
import MoovFoozPayment from './paymentMethods/MoovFoozPayment';




const CheckoutScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute();
  const userData = route.params.userData;
  const cartItems = route.params.cartItems;
  const grandTotal = route.params.grandTotal;
  const shippingCost = route.params.shippingCost;

  // console.log("userData", userData);
  // console.log("cartItems", cartItems);
  // console.log("grandTotal", grandTotal);
  // console.log("shippingCost", shippingCost);
  // console.log("phoneNumber", userData.phoneNumber);
  // console.log("cartItems", cartItems);


  const cartItemCount = useSelector((state) => state.cart.items.length);

  // console.log("cart items d",cartItemCount);
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => (<View
        style={styles.addToCartButton}
      >
        <MaterialCommunityIcons name="cart-outline" size={24} color="#FF9900" />
        {/**number of Shopping cart items */}
        <Text style={styles.cartCount}>{cartItemCount > 0 ? cartItemCount : ''}</Text>
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
  }, [navigation, route.params]);

  // about Payments
  const [selectedPayment, setSelectedPayment] = useState('card');
  return (
    <ScrollView

      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Address Container */}
      <View style={styles.addressContainer}>
        <Ionicons name="location-outline" size={24} color="black" />
        <View style={{ paddingHorizontal: 4 }}>
          <Text style={{ color: "grey", fontSize: 16, }}>Récepteur: <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>{userData?.name}</Text> </Text>
          <Text style={{ color: "grey", fontSize: 16, }}>Numéro de téléphone: <Text style={{ color: "black", fontWeight: "400", fontSize: 16 }}>{userData?.phoneNumber}</Text> </Text>
          <View style={{ marginTop: 8 }}>
            <Text style={{ color: "grey", fontSize: 16, fontWeight: "400", fontStyle: "italic" }}>Addresse: </Text>
            <Text style={{ marginTop: 4, color: "black", fontWeight: "600", fontSize: 16, fontStyle: "italic" }}>{userData?.region}, {userData?.city},</Text>
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>{userData?.town}, {userData?.neighborhood} </Text>
          </View>
        </View>
      </View>

      {/* Item details */}
      <View style={styles.itemContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.item}>
              {item.images && item.images.length > 0 ? (
                <Image source={{ uri: item.images[0] }} style={{ width: 80, height: 80 }} />
              ) : (
                <View style={{ width: 80, height: 80, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No Image</Text>
                </View>
              )}
              <View style={styles.itemDetails}>
                <Text> {item.price} <Text style={{ color: "grey", fontSize: 10 }}>FCFA</Text></Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Payment details */}
      <View style={styles.paymentDetailsContainer}>
        <View style={[styles.shippingCost, { marginBottom: 4 }]}>
          <Text style={{}}>Livraison</Text>
          <Text style={{}}>{cartItems.length != 0 && shippingCost == 0 ? <Text style={{ color: "green", fontWeight: "bold" }}>gratuite</Text> : <Text>{shippingCost} <Text style={{ color: "grey", fontSize: 10 }}> FCFA</Text></Text>}</Text>
        </View>

        <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "grey", fontSize: 14, fontWeight: "bold", }}>Total a payé</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", }}>{grandTotal}<Text style={{ color: "grey", fontSize: 12 }}> FCFA</Text></Text>
        </View>

      </View>
      {/*-- Payment Methods----------------------------------------------------------------------- */}
      <View style={{ marginTop: 10, width: "100%", backgroundColor: "white", height: 445, gap: 10, borderRadius: 5, padding: 5 }}>
        <View style={{ padding: 4, backgroundColor: "grey", height: 90, width: "100%" }}>
          <Text style={{ fontWeight: "700", color: "orange", fontSize: 18, marginLeft: 4, }} >Mode de Paiement:</Text>

          <View style={{ marginTop: 10, flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, alignItems: "center", justifyContent: "center" }}
            >
              <TouchableOpacity onPress={() => setSelectedPayment('card')}>
                <View style={{ borderColor: "orange", borderWidth: 2, backgroundColor: "#0D0DFF", borderRadius: 5, padding: 2 }}>
                  <Text style={{
                    textAlign: "center",
                    paddingHorizontal: selectedPayment == "card" ? 2 : 0,
                    paddingVertical: selectedPayment == "card" ? 4 : 0,
                    fontSize: selectedPayment == "card" ? 16 : 13,
                    fontWeight: "600", color: "white",
                  }}> Carte  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedPayment('MyNita')}>
                <View style={{ borderColor: "#ECA191", borderWidth: 2, backgroundColor: "white", borderRadius: 5, padding: 2 }}>
                  <Text style={{
                    // if selectdPAyment is MyNita then change color to orange
                    paddingHorizontal: selectedPayment == "MyNita" ? 2 : 0,
                    paddingVertical: selectedPayment == "MyNita" ? 4 : 0,
                    fontSize: selectedPayment == "MyNita" ? 16 : 13,
                    fontWeight: "600", color: "blue",
                  }}> My Nita </Text>

                  {/* <Text> partage et imprission </Text> */}
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedPayment('Alizza')}>
                <View style={{ backgroundColor: "yellow", borderRadius: 5, padding: 2, borderWidth: 2, borderColor: "black", }}>
                  <Text style={{
                    textAlign: "center",
                    paddingHorizontal: selectedPayment == "Alizza" ? 2 : 0,
                    paddingVertical: selectedPayment == "Alizza" ? 4 : 0,
                    fontSize: selectedPayment == "Alizza" ? 16 : 13,
                    fontWeight: "600", color: "black",
                  }}> Al Izza </Text>
                </View>
              </TouchableOpacity>



              <TouchableOpacity onPress={() => setSelectedPayment('AmanaTa')}>
                <View style={{ borderColor: "green", borderWidth: 2, backgroundColor: "orange", borderRadius: 5, padding: 2 }}>
                  <Text style={{
                    textAlign: "center",
                    paddingHorizontal: selectedPayment == "AmanaTa" ? 2 : 0,
                    paddingVertical: selectedPayment == "AmanaTa" ? 4 : 0,
                    fontSize: selectedPayment == "AmanaTa" ? 16 : 13,
                    fontWeight: "600", color: "white",
                  }}> AmanaTa </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedPayment('MoovFooz')}>
                <View style={{ backgroundColor: "#9ACD32", borderRadius: 5, padding: 2, borderWidth: 2, borderColor: "red", }}>
                  <Text style={{
                    textAlign: "center",
                    paddingHorizontal: selectedPayment == "MoovFooz" ? 2 : 0,
                    paddingVertical: selectedPayment == "MoovFooz" ? 4 : 0,
                    fontSize: selectedPayment == "MoovFooz" ? 16 : 13,
                    fontWeight: "600", color: "black",
                  }}> Moov Fooz </Text>
                </View>
              </TouchableOpacity>

            </ScrollView>

          </View>

        </View>



        <View style={{ borderWidth: 1, borderColor: "orange", marginBottom: 5 }}>

        </View>
        {/* -----Phone Payment -------- */}
        {selectedPayment === 'card' && <CardPayment userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />}
        {selectedPayment === 'Alizza' && <Al_izzaPayment userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />}
        {selectedPayment === 'AmanaTa' && <AmanaTa userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />}
        {selectedPayment === 'MyNita' && <MyNitaPayment userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />}
        {selectedPayment === 'MoovFooz' && <MoovFoozPayment userData={userData} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />}

        {/* <StripeApp confirmBooking={confirmBooking} userData={userData} userId={userId} /> */}

        {/* -----Card Payment -------- */}

        {/* <StripePayment confirmBooking={confirmBooking} userData={userData} userId={userId} /> */}



      </View>
    </ScrollView>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  //header
  addToCartButton: {
    alignItems: 'center',
    //position: 'absolute',
    alignSelf: "center",

  },
  cartCount: {
    position: 'absolute',
    top: -12,
    right: 8,
    color: 'black',
    fontWeight: "bold"
  },
  //Body
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  //address
  addressContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  addressText: {
    marginVertical: 4,
    fontSize: 14,
  },
  itemContainer: {
    marginVertical: 4,
  },
  item: {
    flexDirection: "column",
    marginVertical: 2,
    marginHorizontal: 4,
  },
  //Payment methods
  paymentMethodsContainer: {
    backgroundColor: "grey",

  },
  //Payment details
  paymentDetailsContainer: {
    paddingHorizontal: 8,
    paddingTop: 4,

  },
  shippingCost: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  }
})