import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/MaterialIcons";

const ProductsCard = ({ category, subCategory, product, onRate }) => {
    if (product.empty) {
        return <View style={[styles.card, styles.hiddenCard]} />;
      }

    const navigation = useNavigation()

    const [rating, setRating] = useState(0);
  
    const handlePress = (star) => {
      setRating(star);
      if (onRate) {
        onRate(star); // Send rating back to parent component
      }
    };
  return (
    <TouchableOpacity
    onPress={
      () => navigation.navigate('ProductDetails', {
        productTitle: product.title,
        product: product,
        id: product.id,
      })
    }

    style={styles.container}
  >

    <View style={styles.cartContainer}>
      {/** From all the images in the product list, pick the first one and display it */}
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.title}>{product.title}</Text>
        {/** stars */}
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handlePress(star)}>
              <Icon
                name="star"
                size={18}
                color={star <= rating ? "black" : "black"} // Gold for selected, gray for unselected
                style={{
                  margin: 1,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.price}>{product.price} <Text style={{ color: "grey", fontSize: 10 }}>FCFA</Text> </Text>

      </View>

    </View>



  </TouchableOpacity>
  )
}

export default ProductsCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 1,
      },
      cartContainer: {
        marginTop: 2,
        flexDirection: "column",
        justifyContent: "center",
        padding: 0.5,
      },
      // set the image with and height the same as the container
    
      image: {
        width: "100%",
        height: 250,
        borderRadius: 4,
        resizeMode: "contain",
      },
      infoContainer: {
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 2
      },
      title: {
        fontSize: 10,
        color: 'grey',
      },
      starsContainer: {
        flexDirection: 'row',
      },
      price: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    
      },
      hiddenCard: {
        backgroundColor: 'transparent', // Hides the placeholder item
      },
})