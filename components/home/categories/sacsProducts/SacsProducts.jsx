import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const SacsProducts = ({category}) => {
  const sacsCategories = [
    { id: 1, name: 'Tout' },
    { id: 2, name: 'Sacs à roulettes' },
    { id: 3, name: 'Sacs à dos' },
    { id: 4, name: 'Sacs de poitrine' },
    { id: 5, name: 'Sacs à main' },
    { id: 6, name: 'Portefeuille' },

  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp subCategory={sacsCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

    </View>
  )
}

export default SacsProducts

const styles = StyleSheet.create({})