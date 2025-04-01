import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const AccessoiresProducts = ({category}) => {
  const accsessoiresCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Montres' },
    { id: 3, name: 'Lunettes' },
    { id: 4, name: 'Ceintures' },
    { id: 5, name: 'Foulards' },
    { id: 6, name: 'Chap-Casquets' },
    { id: 7, name: 'Cravates' },
    { id: 8, name: 'Hijab' },
    { id: 9, name: 'Chaussettes' },
  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp category={category} subCategory={accsessoiresCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

    </View>
  )
}

export default AccessoiresProducts

const styles = StyleSheet.create({})