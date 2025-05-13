import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const ReviewProductScreen = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => (<View
        style={{ marginLeft: 30 }}
      >
        <Text style={{ color: "#FF9900", fontSize: 18 }}>Évaluation du Produit</Text>
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

  const params = useRoute().params;
  const order = params?.order;
  const orderId = params?.orderId;
  console.log("orderId", orderId);
  //console.log("order", order);
  const productId = params?.productId;
  //console.log("productId", productId);

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const getProduct = async () => {
    setLoadingProduct(true);
    try {
      const userRef = doc(db, 'murnaShoppingPosts', productId);
      const product = await getDoc(userRef);
      setProduct({ ...product.data(), id: product.id });
      setLoadingProduct(false);
    }
    catch (error) {
      console.log("error", error);
      setLoadingProduct(false);
    }

  }
  useEffect(() => {
    getProduct();
  }, []);

  //console.log("product", product);

  const [loadingReview, setLoadingReview] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [loadingExistingReview, setLoadingExistingReview] = useState(false);


  const handlePress = (star) => {
    setRating(star);
  };

  const userId = order.userId;
  //check if the user has already reviewed the product
  useEffect(() => {
    const checkReview = async () => {
      setLoadingExistingReview(true);
      try {
        const reviewRef = doc(db, 'murnaShoppingPosts', productId, 'reviews', orderId);
        const reviewDoc = await getDoc(reviewRef);
        if (reviewDoc.exists()) {
          setExistingReview(reviewDoc.data());
          setHasReviewed(true);
          setLoadingExistingReview(false);
        } else {
          setExistingReview(null);
          setHasReviewed(false);
          setLoadingExistingReview(false);
        }
        setLoadingExistingReview(false);
      } catch (error) {
        console.log("error", error);
        setLoadingExistingReview(false);
      }

    }
    checkReview();
  }, []);

  console.log("existingReview", existingReview?.comment);
  console.log("hasReviewed", hasReviewed);


  const handleReview = async () => {
    setLoadingReview(true);
    try {
      if (!userId || rating < 1) return;
      const reviewRef = doc(db, 'murnaShoppingPosts', productId, 'reviews', orderId);
      await setDoc(reviewRef, {
        productId: productId,
        userId: order.userId,
        userName: order.userName,
        userImage: order.userImage,
        orderId: orderId,
        rating: rating,
        comment: review,
        createdAt: new Date(),
      });
      // update the product with the new review
      alert('Thank you! Your review has been submitted.');
      setLoadingReview(false);
      navigation.goBack();
    }
    catch (error) {
      console.log("error", error);
      setLoadingReview(false);
    }
  }
  // console.log("productReview", productReview);
  // if loading is true, show a loading indicator
  if (loadingExistingReview) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <View>

      {
        product && (
          <View>
            {
              order?.cartItems.map((item, index) => (
                <View key={index} >
                  <View style={{ flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                    <Image source={{ uri: order.productImage }} style={{ width: 60, height: 60 }} />
                    <View style={{ marginLeft: 10, gap: 10 }}>
                      <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>{product?.title}</Text>
                      <Text style={{ fontSize: 16, color: "black", fontWeight: "400" }}>{item?.price}<Text style={{ fontWeight: "400", fontSize: 14, color: "grey" }}> FCFA</Text></Text>
                    </View>
                  </View>


                  {/** if the user has already reviewed the product, show the review */}
                  {
                    hasReviewed ? (
                      <View style={{ marginTop: 15, padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                        <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>Votre évaluation</Text>
                        <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", gap: 5 }}>
                          {/** stars */}
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <TouchableOpacity key={star} onPress={() => handlePress(star)}>
                                <Icon
                                  name={star <= existingReview.rating ? "star" : "star-outline"}
                                  size={18}
                                  color={star <= existingReview.rating ? "#FF9900" : "black"} // Gold for selected, gray for unselected
                                  // Gold for selected, gray for unselected
                                  style={{
                                    margin: 1,
                                  }}
                                />
                              </TouchableOpacity>
                            ))}
                            {existingReview.rating === 1 && <Text style={{ color: "grey", fontSize: 14 }}>Pas du tout satisfait</Text>}
                            {existingReview.rating === 2 && <Text style={{ color: "grey", fontSize: 14 }}>Pas satisfait</Text>}
                            {existingReview.rating === 3 && <Text style={{ color: "grey", fontSize: 14 }}>Satisfait</Text>}
                            {existingReview.rating === 4 && <Text style={{ color: "grey", fontSize: 14 }}>Très satisfait</Text>}
                            {existingReview.rating === 5 && <Text style={{ color: "grey", fontSize: 14 }}>Extrêmement satisfait</Text>}
                          </View>
                        </View>
                        <Text style={{ marginTop: 10, fontSize: 16, color: "black", fontWeight: "400" }}>{existingReview.comment}</Text>
                      </View>
                    ) : (
                      <>
                       <View style={{ marginTop: 15, padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                    <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>Évaluation</Text>
                    <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", gap: 5 }}>
                      {/** stars */}
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 5, }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <TouchableOpacity key={star} onPress={() => handlePress(star)}>
                            <Icon
                              name={star <= rating ? "star" : "star-outline"}
                              size={18}
                              color={star <= rating ? "#FF9900" : "black"} // Gold for selected, gray for unselected
                              // Gold for selected, gray for unselected
                              style={{
                                margin: 1,
                              }}
                            />
                          </TouchableOpacity>
                        ))}
                        {rating === 1 && <Text style={{ color: "grey", fontSize: 14 }}>Pas du tout satisfait</Text>}
                        {rating === 2 && <Text style={{ color: "grey", fontSize: 14 }}>Pas satisfait</Text>}
                        {rating === 3 && <Text style={{ color: "grey", fontSize: 14 }}>Satisfait</Text>}
                        {rating === 4 && <Text style={{ color: "grey", fontSize: 14 }}>Très satisfait</Text>}
                        {rating === 5 && <Text style={{ color: "grey", fontSize: 14 }}>Extrêmement satisfait</Text>}
                      </View>
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 16, color: "black", fontWeight: "400" }}>Écrivez votre avis</Text>
                    <TextInput
                      multiline
                      numberOfLines={4}
                      maxLength={3000}
                      onFocus={() => setReview("")}
                      onChangeText={(text) => setReview(text)}
                      value={review}
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 10,
                        height: 100,
                        textAlignVertical: "top",
                        backgroundColor: "#f9f9f9",
                      }}
                      placeholder="Écrivez votre avis ici"

                    />
                  </View>


                  <View style={{ padding: 10, marginTop: 20 }}>
                    <TouchableOpacity
                      onPress={handleReview}
                      disabled={loadingReview}
                      style={{
                        backgroundColor: "#FF9900",
                        padding: 15,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      {
                        loadingReview ? (
                          <Text style={{ color: "white", fontSize: 16 }}>Envoi...</Text>
                        ) : (
                          <Text style={{ color: "white", fontSize: 16 }}>Envoyer</Text>
                        )
                      }
                    </TouchableOpacity>
                  </View>
                      </>
                    )
                  }
                 
                </View>
              ))
            }


          </View>
        )
      }



    </View>
  )
}

export default ReviewProductScreen

const styles = StyleSheet.create({})