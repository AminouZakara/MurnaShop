import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loadCart, removeFromCart, updateQuantity } from "../../redux/cartSlice";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { validateCartSmart } from "../../components/cart/ValidateCartSmart";

const CartScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items || []);
  console.log("cart items", cartItems);
  const dispatch = useDispatch();
  //load cart
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price * cartItem.quantity)
    })
    setTotalAmount(temp);
    // console.log(temp)
  }, [cartItems])

  // asign shipping cost 
  const [shippingCost, setShippingCost] = useState(0);
  useEffect(() => {
    if (cartItems.length == 0) {
      setShippingCost(0)
    } else if (totalAmount >= 4500) {
      setShippingCost(0)
    } else {
      setShippingCost(500)
    }
  }, [shippingCost])
  //console.log("Shipping Cost:", shippingCost);


  const grandTotal = shippingCost + totalAmount

  //console.log("Shipping:", shippingCost, "ToalAmount:", totalAmount);
  //console.log("GrandTotal:", grandTotal);
  // store cart items in local storage

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
    // console.log("item removed");
  };
  // update quantity of item in cart
  const handleUpdateQuantity = (item, quantity) => {
    dispatch(updateQuantity(item, quantity));
    // console.log("quantity updated");
  };

  //console.log("Calling validateCartSmart with:", cartItems);
  //console.log("Is array:", Array.isArray(cartItems));
  // checkout
  const [loading, setLoading] = useState(false)
  const handleSmartCheckout = async (cartItems) => {
    setLoading(true);
    try {
      const { issues, updatedCart } = await validateCartSmart(cartItems);

      if (issues.length > 0) {
        const issueMessages = issues.map(issue => `• ${issue.message}`).join('\n');

        Alert.alert(
          'Cart Updated',
          `${issueMessages}\n\nWould you like to proceed with the updated cart?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Proceed',
              onPress: () => {
                navigation.navigate('AddressScreen', {
                  cartItems: updatedCart,
                  grandTotal,
                  shippingCost
                });
              },
            },
          ]
        );
      } else {
        navigation.navigate('AddressScreen', {
          cartItems: updatedCart,
          grandTotal,
          shippingCost
        });
      }
    } catch (error) {
      console.log("Error handling Smart Checkout", error);
      Alert.alert("Checkout Error", "Something went wrong. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}>
      {
        cartItems.length > 0 ? (
          <>
            <ScrollView>
              {
                cartItems.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{ backgroundColor: "white", width: "100%", flexDirection: "row", padding: 10, marginVertical: 5, }}>
                      <TouchableOpacity
                        onPress={
                          () => navigation.navigate('ProductDetails', {
                            productTitle: item.title,
                            product: item,
                            id: item.id,
                          })
                        }
                        style={{ width: "30%" }}>
                        <Image source={{ uri: item.images[0] }} style={{ width: 100, height: 100 }} />
                      </TouchableOpacity>

                      <View style={{ width: "70%", gap: 40 }}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ width: "80%", }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{ fontSize: 14, color: "grey" }}>{item.title}</Text>
                          </View>

                          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                            <FontAwesome name="trash-o" size={24} color="grey" />
                          </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                          <View style={{ width: "60%" }}>
                            <Text style={{ fontSize: 18, }}>{item.price} <Text style={{ color: "grey", fontSize: 10 }}>FCFA</Text></Text>
                          </View>

                          <View style={{ backgroundColor: "lightgrey", flexDirection: "row", width: "40%", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                              onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                              style={{ width: "25%", borderRadius: 40, justifyContent: "center", alignItems: "center" }}
                            >
                              <Text style={{ fontSize: 24, color: "grey", fontWeight: "bold" }}>-</Text>
                            </TouchableOpacity>

                            <Text style={{ width: "50%", fontSize: 14, fontWeight: "bold", textAlign: "center" }}>{item.quantity}</Text>


                            <TouchableOpacity
                              onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              style={{ width: "25%", borderRadius: 20, justifyContent: "center", alignItems: "center" }}
                            >
                              <Text style={{ fontSize: 18, color: "grey", fontWeight: "bold" }}>+</Text>
                            </TouchableOpacity>

                          </View>


                        </View>
                      </View>


                    </View>
                  )
                })
              }


            </ScrollView>

            <View style={styles.payment}>

              <View style={[styles.paymentContainer, { borderBottomWidth: 1, borderColor: "lightgrey", marginBottom: 10 }]}>
                <Text style={{}}>Livraison</Text>
                <Text style={{}}>{cartItems.length != 0 && shippingCost == 0 ? <Text style={{ color: "green", fontWeight: "bold" }}>gratuite</Text> : <Text>{shippingCost} <Text style={{ color: "grey", fontSize: 10 }}> FCFA</Text></Text>}</Text>
              </View>

              <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                <View style={{ flexDirection: "column" }}>
                  <Text style={{ color: "grey", fontSize: 14, fontWeight: "bold", }}>Total a payé</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold", }}>{grandTotal}<Text style={{ color: "grey", fontSize: 14 }}> FCFA</Text></Text>
                </View>


                <TouchableOpacity
                  disabled={loading}
                  style={{
                    width: "40%",
                    height: 40,
                    backgroundColor: loading ? "#cccccc" : "#FF9900",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20
                  }}
                  onPress={() => handleSmartCheckout(cartItems)} // Call explicitly
                >
                  <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>
                    {loading ? "Chargement..." : "Achever l'achat"}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </>

        ) : (
          <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Text style={{ fontSize: 24, color: "grey" }}>Votre panier est vide</Text>

            <TouchableOpacity
              style={{
                height: 40,
                marginVertical: 20,
                paddingHorizontal: 8,
                backgroundColor: "#FF9900",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("Main", { screen: "Home" })}>
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>Commençer à acheter</Text>
            </TouchableOpacity>
          </View>
        )}

    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {},
  cart: {},
  payment: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
    elevation: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  }
})