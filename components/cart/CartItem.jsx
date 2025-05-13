// CartItem.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={onRemove}>
        <FontAwesome name="trash-o" size={24} color="grey" />
      </TouchableOpacity>

      <Image source={{ uri: item.images[0] }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price} FCFA</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onUpdateQuantity(item, item.quantity - 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => onUpdateQuantity(item, item.quantity + 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    width: "100%",
  },
  cartItemImage: {
    width: 100,
    height: 100,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 14,
    color: "grey",
    numberOfLines: 1,
  },
  itemPrice: {
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  quantityButtonText: {
    fontSize: 18,
    color: "grey",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
  },
});

export default CartItem;