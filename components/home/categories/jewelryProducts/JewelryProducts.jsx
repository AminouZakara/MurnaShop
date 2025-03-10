import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const JewelryProducts = ({category}) => {
  const jewelryCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Alliances' },
    { id: 3, name: 'Bagues' },
    { id: 4, name: 'Bague-Fiançails' },
    { id: 5, name: 'Boucles' },
    { id: 6, name: 'Bracelets' },
    { id: 7, name: 'Colliers' },
    { id: 8, name: 'Gourmettes' },
    { id: 9, name: 'Lunettes' },
  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp subCategory={jewelryCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

    </View>
  )
}

export default JewelryProducts

const styles = StyleSheet.create({})