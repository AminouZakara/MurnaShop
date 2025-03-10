import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const HommeProducts = ({category}) => {
  const menCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Vêtement' },
    { id: 3, name: 'Chemises' },
    { id: 4, name: 'T-shirts' },
    { id: 5, name: 'Pantalon' },
    { id: 6, name: 'Gean' },
    { id: 6, name: 'Shorts' },
    { id: 7, name: 'Sous-vêtes' },
    { id: 8, name: 'Vêtes de nuit' },
    { id: 9, name: 'Cravates' },
    { id: 10, name: 'Chaussettes' },
    { id: 11, name: 'Chap-Casquets' },
    { id: 12, name: 'Bijoux' },
    { id: 13, name: 'Montres' },
    { id: 14, name: 'Lunettes' },
    { id: 15, name: 'Baskets' },
    { id: 16, name: 'Crampons' },
    { id: 17, name: 'Souliers' },
    { id: 18, name: 'Sandales' },
    { id: 19, name: 'Bottes' },
    { id: 20, name: 'Ceintures' },
    { id: 21, name: 'Sacs à main' },
    { id: 22, name: 'Sacs à dos' },
    { id: 23, name: 'Sacs de poitrine' },
    { id: 24, name: 'Portefeuille' },
    { id: 25, name: 'Rasage' },
    { id: 26, name: 'Pommade' },
    { id: 27, name: 'Parfum' },
  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp subCategory={menCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />


    </View>
  )
}

export default HommeProducts

const styles = StyleSheet.create({})