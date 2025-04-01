import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../redux/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/favoriteSlice';


const ProductDetailHeader = ({ product }) => {
    const navigation = useNavigation()

    const dispatch = useDispatch()
    console.log("pro", product.title);
       const cartItemCount = useSelector((state) => state.cart.items.length);
   
   // console.log("cart items d",cartItemCount);
    //like button
    const favorites = useSelector((state) => state.favorites.items);
    const isFavorite = favorites.some((item) => item.id === product.id);
    // handle share on social media
    const shareProduct = () => {
        Share.share({
            //set the message in 3 lines
            message: `Regarde ce produit sur Imoservice;\nTitre: ${product.title} \nPrix: ${product.price} CFA \nDescription: ${product.description} \nLink: ${product?.link} \n`,
        })
            .then(result => console.log(result))
            .catch(error => console.error(error));
    }
    return (
        <View>
            <View style={styles.headerContainer}>
                {/** Shopping cart */}
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => navigation.navigate("Main", { screen: "Cart" })}>
                    <MaterialCommunityIcons name="cart-outline" size={24} color="#FF9900" />
                {/**number of Shopping cart items */}
                <Text style={styles.cartCount}>{cartItemCount > 0 ? cartItemCount : ''}</Text>
                </TouchableOpacity>


                {/** Share button */}
                <TouchableOpacity
                    onPress={shareProduct}
                    style={styles.shareButton}>
                    <Feather name="share" size={24} color="#FF9900" />
                </TouchableOpacity>


                {/** Like button */}
                <TouchableOpacity onPress={() =>
                    isFavorite ? dispatch(removeFromFavorites(product.id)) : dispatch(addToFavorites(product))
                }>
                    {
                        isFavorite ? <FontAwesome name="heart" size={24} color="#FF9900" />
                            : <FontAwesome name="heart-o" size={24} color="#FF9900" />
                    }
                </TouchableOpacity>
            </View>



        </View>
    )
}

export default ProductDetailHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        gap: 40,
    },
    cartCount:{
        position: 'absolute',
        top: -12,
        right: 8,
        color: 'black',
        fontWeight:"bold"
    }
})