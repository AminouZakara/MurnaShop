import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
import { FlatList } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from "react-native-vector-icons/MaterialIcons";
import ProductGalleri from './ProductGalleri';
import { addToCart } from '../../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import ProductDetailHeader from '../../../components/productDetail/ProductDetailHeader';
import SimilarProducts from './SimilarProducts';



const { width, height } = Dimensions.get("window"); // Get screen width and height

const ProductDetails = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => <ProductDetailHeader product={product} />,
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
  }, [navigation, product]);
  const route = useRoute();
  const product = route.params.product;
  const user = firebase.auth().currentUser
  const [isLoading, setIsLoading] = useState(false)
  const [fbProduct, setFbProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const docRef = doc(db, "murnaShoppingPosts", product.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFbProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }

    }
    fetchProduct();
  },
    [product.id,]);

  // console.log("product id:", product.id);
  //console.log("fbProduct id:", fbProduct.id);
  const images = product.images

  //   // HandlePress
  const [rating, setRating] = useState(0);
  const handlePress = (star) => {
    setRating(star);
    if (onRate) {
      onRate(star); // Send rating back to parent component
    }
  };
  //   // chosenSize
  const [chosenSize, setChosenSize] = useState(null);


  // chosenColor
  const [chosenColor, setChosenColor] = useState(null);



  const dispatch = useDispatch();

  // add To Cart
  const aasddToCart = async () => {
    console.log("product id", product.id);
    console.log("product Title", product.title);
    console.log("product Price", product.price,);
    console.log("Chozen color", chosenColor);
    console.log("Chozen size", chosenSize);
  }

  console.log("product Category", product.category);
  console.log("product productType", product.productType);
  console.log("product Title", product.title);


  return (
    <View style={styles.container}>
      {/** if product exists return product details otherwise return product not found */}
      {
        isLoading ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          fbProduct.id ? (
            <>
              <ScrollView>

                <Carousel
                  loop={true}  // Optional: if you want the carousel to loop
                  width={width}  // The width of the carousel (screen width)
                  height={height * 0.65} // Height of the image (65% of the screen height)
                  autoPlay={false} // Optional: if you want to auto-play the carousel
                  data={images}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                  )}
                />
                <View style={styles.itemDetail}>
                  <Text style={styles.itemTitle}>{product.title}</Text>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                    <Text style={styles.itemPrice}>{product.price} <Text style={{ color: "grey", fontSize: 10 }}>FCFA</Text></Text>

                    <View style={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} >
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
                  </View>

                  {/** Sizes */}
                  <View style={styles.sizesContainer}>
                    <Text style={styles.sizeTitle}>Taille</Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.sizes}>
                      {/** Sizes */}
                      {product.sizes.map((size) => (
                        <TouchableOpacity
                          key={size}
                          onPress={() => setChosenSize(size)}
                          style={[styles.sizeButton, chosenSize === size && {


                          }]}>
                          <Text
                            style={{
                              fontSize: chosenSize === size ? 18 : 14,
                              fontWeight: chosenSize === size ? "700" : "400",
                              color: chosenSize === size ? "black" : "grey"
                            }}>{size}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>

                  </View>

                  {/** Colors */}
                  <View style={styles.colorContainer}>
                    <Text style={styles.colorTitle}>Couleur</Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.colors}>
                      {/** colors */}
                      {product.colors.map((color) => (
                        <TouchableOpacity
                          key={color}
                          onPress={() => setChosenColor(color)}
                          style={[styles.colorButton, chosenColor === color && {
                            borderColor: color,
                            borderWidth: 2,

                          }]}>
                          <View style={{ backgroundColor: color, height: 30, width: 30, borderRadius: 15 }} />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>

                  </View>



                  {/** Photos galleri. map all the images of the product then display and when a photo is clicked , it will be displayed in full screen and the other photos will be displayed in a carousel view */}
                  <View style={styles.galleryContainer}>
                    <Text style={styles.galleryTitle}>Galerie</Text>
                    <ProductGalleri images={images} />
                  </View>

                  {/**Item reviews */}
                  {/**Show ony three reviews the rest click on the button to see more */}
                  <View style={styles.reviewsContainer}>
                    <Text style={styles.reviewsTitle}>Avis</Text>

                  </View>



                </View>

                {/** Similar products */}
                <View style={styles.similarProductsContainer}>
                  <Text> Produits similaires</Text>
                  <SimilarProducts productType={product.productType} id={product.id} />
                </View>


              </ScrollView>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => dispatch(addToCart(product))}
              >
                <Text style={styles.addToCartButtonText}>Ajouter au panier</Text>
              </TouchableOpacity>
            </>

          ) : (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ textAlign: "center" }}>Produit non trouvé</Text>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => navigation.navigate("Main", { screen: "Cart" })}>

                <Text style={styles.addToCartButtonText}>Retournez au panier</Text>
              </TouchableOpacity>
            </View>
          )
        )
      }




    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  // let the image cover the whole width of the screen and let the image height be 50% of the screen height
  image: {
    backgroundColor: "white",
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
  itemDetail: {
    width: '100%',
    padding: 4
  },
  itemPrice: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",

  },
  starsContainer: {
    flexDirection: 'row',
  },
  sizesContainer: {
    marginTop: 15,
    flexDirection: "column",
  },
  sizes: {
    flexDirection: 'row',
  },
  sizeButton: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,

  },
  colorContainer: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: 'space-between',

  },
  colors: {
    flexDirection: 'row',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 16,
  },
  addToCartButton: {
    width: "90%",
    marginVertical: 10,
    backgroundColor: '#FF9900',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addToCartButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  galleryContainer: {
    marginTop: 20,
  }

})