import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const ChaussuresProducts = ({category}) => {
  const chaussuresCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Talon haut' },
    { id: 3, name: 'Talon bas' },
    { id: 4, name: 'Sandales' },
    { id: 5, name: 'Baskets' },
    { id: 6, name: 'Crampons' },
    { id: 7, name: 'Souliers' },
    { id: 8, name: 'Bottes' },

  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp category={category} subCategory={chaussuresCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

    </View>
  )
}

export default ChaussuresProducts

const styles = StyleSheet.create({})