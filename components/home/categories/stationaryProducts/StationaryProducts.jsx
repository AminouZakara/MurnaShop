import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const StationaryProducts = ({category}) => {
  const stationaryCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Livres' },
    { id: 3, name: 'Cahiers' },
    { id: 4, name: 'Papier' },
    { id: 5, name: 'Stylos' },
    { id: 6, name: 'Crayons' },
    { id: 7, name: 'Autres' },
  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <SubCategoryProp subCategory={stationaryCategories} selectedCategory={ selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

    </View>
  )
}

export default StationaryProducts

const styles = StyleSheet.create({})