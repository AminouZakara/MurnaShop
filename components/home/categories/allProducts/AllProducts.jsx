import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '../../../props/home/productLists/ProductList'
import { fetchAllProducts } from '../../../../redux/productsSlice'

const AllProducts = ({ category }) => {
  // Used to get all products from the database 
  const allProducts = useSelector(state => state.products.items);
 const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllProducts());
  },[dispatch])
 
  //console.log("all Products:", allProducts)
  console.log("all Products length:", allProducts.length)

  return (
    <View>
      <Text>Page d'acceuille</Text>
      <Text>Vous êtes dans la catégorie : {category}</Text>
      <View>
        {

          allProducts.length > 0 ? (
            <ProductList category={category} productLists={allProducts} />

          ) : (
            <Text>Aucun produit trouvé</Text>
          )
        }
      </View>


    </View>
  )
}

export default AllProducts

const styles = StyleSheet.create({})