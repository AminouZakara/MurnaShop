import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductList from '../../../props/home/productLists/ProductList'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

const AllProducts = ({ category }) => {
  // Used to get all products from the database 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProducts();
  }, [])
  const [allProducts, setAllProducts] = useState([]);
  const getAllProducts = async () => {
    setLoading(true)
    try {
      setAllProducts([])
      const unsub = onSnapshot(query(collection(db, 'murnaShoppingPosts')),
        (querySnapshot) => {
          const go = [];
          querySnapshot.forEach((doc) => {
            go.push({ id: doc.id, ...doc.data() });
          });
          setAllProducts(go);
          setLoading(false)
        }
      );
      return () => unsub();
    } catch (error) {
      console.log("Oops! cannot get latestPost: ", error)
      setLoading(false)
    }
  }
  //console.log("all Products:", allProducts)
  console.log("all Products length:", allProducts.length)

  return (
    <View>
      <Text>Page d'acceuille</Text>
      <Text>Vous êtes dans la catégorie : {category}</Text>
      {
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (<View>
          {

            allProducts.length > 0 ? (
              <ProductList category={category} productLists={allProducts} />

            ) : (
              <Text>Aucun produit trouvé</Text>
            )
          }
        </View>)
      }


    </View>
  )
}

export default AllProducts

const styles = StyleSheet.create({})