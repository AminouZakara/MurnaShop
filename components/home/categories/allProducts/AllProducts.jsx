import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductList from '../../../props/home/productLists/ProductList'

const AllProducts = ({category}) => {
  return (
    <View>
      <Text>Page d'acceuille</Text>
      <Text>Vous êtes dans la catégorie : {category}</Text>
      <ProductList category={category} />

    </View>
  )
}

export default AllProducts

const styles = StyleSheet.create({})