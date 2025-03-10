import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const BeautyProducts = ({category}) => {
  const beautyCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Maquillage' },
    { id: 3, name: 'Manu-Pédicure' },
    { id: 4, name: 'Outils de beauté' },
    { id: 5, name: 'Bain accessoires' },
    { id: 6, name: 'Perruques' },
    { id: 7, name: 'Rasage' },
    { id: 8, name: 'Pommade' },
    { id: 9, name: 'Shampooing' },
    { id: 10, name: 'Parfums' },
    { id: 11, name: 'Trous-toilette' },
  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp subCategory={beautyCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

    </View>
  )
}

export default BeautyProducts

const styles = StyleSheet.create({})