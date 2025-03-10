import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const FillesProducts = ({category}) => {
    const fillesCategories = [
        { id: 1, name: "Tout" },
        { id: 2, name: 'Vêtement' },
        { id: 3, name: 'Sous-vêtes' },
        { id: 4, name: 'Vêtes de nuit' },
        { id: 5, name: 'Hijab' },
        { id: 6, name: 'Foulards' },
        { id: 7, name: 'Chemises' },
        { id: 8, name: 'T-shirts' },
        { id: 9, name: 'Pantalon' },
        { id: 10, name: 'Collants' },
        { id: 11, name: 'Gean' },
        { id: 12, name: 'Shorts' },
        { id: 13, name: 'Chaussettes' },
        { id: 14, name: 'Chap-Casquets' },
        { id: 15, name: 'Montres' },
        { id: 16, name: 'Lunettes' },
        { id: 17, name: 'Talon haut' },
        { id: 18, name: 'Talon bas' },
        { id: 29, name: 'Sandales' },
        { id: 20, name: 'Bottes' },
        { id: 21, name: 'Ceintures' },
        { id: 22, name: 'Sacs à dos' },
    
      ]
      const [selectedCategory, setSelectedCategory] = useState("Tout")
      return (
        <View style={styles.container}>
          <SubCategoryProp subCategory={fillesCategories} selectedCategory={ selectedCategory} setSelectedCategory={setSelectedCategory} />
          <ProductList category={category} subCategory={selectedCategory} />

        </View>
  )
}

export default FillesProducts

const styles = StyleSheet.create({})