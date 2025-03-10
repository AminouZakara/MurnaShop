import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductList = ({category, subCategory}) => {
  return (
    <View>
      <Text>Categorie: {category}</Text>
      <Text>Type: {subCategory}</Text>
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({})