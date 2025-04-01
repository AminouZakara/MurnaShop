import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const BabyProducts = ({category}) => {
  const babyCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Vêtements pour bébé' },
    { id: 3, name: 'Chaussures bébé fille' },
    { id: 4, name: 'Chaussures bébé garçon' },
    { id: 5, name: 'Allaitement' },
    { id: 6, name: 'Poussette bébé' },
    { id: 7, name: 'Trotteur bébé' },
    { id: 8, name: 'Rangement bébé' },
    { id: 9, name: 'Jouets pour bébé' },
    { id: 10, name: 'Équipement voyage bébé' },
    { id: 11, name: 'Soins bébé' },
    { id: 12, name: 'Couches bébé' },

  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp category={category} subCategory={babyCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </View>
  )
}

export default BabyProducts

const styles = StyleSheet.create({})