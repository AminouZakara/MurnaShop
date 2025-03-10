import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const SportsProducts = ({category}) => {
  const sportsCategories = [
    { id: 1, name: "All" },
    { id: 2, name: 'Femme' },
    { id: 3, name: 'Beauté' },
    { id: 4, name: 'Homme' },
    { id: 5, name: 'Bijoux' },
    { id: 6, name: 'Sports' },
    { id: 7, name: 'Enfant' },
    { id: 8, name: 'Bébé' },
    { id: 9, name: 'Électronique' },
    { id: 10, name: 'Maison' },
    { id: 11, name: 'Stationnaire' },

  ]
  const [selectedCategory, setSelectedCategory] = useState("All")
  return (
    <View style={styles.container}>
      <SubCategoryProp subCategory={sportsCategories} selectedCategory={ selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

    </View>
  )
}

export default SportsProducts

const styles = StyleSheet.create({})