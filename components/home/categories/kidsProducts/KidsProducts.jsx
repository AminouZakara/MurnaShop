import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'
import GenderProp from '../../../props/home/genderProps/GenderProp'
import KidsProp from '../../../props/home/kidsProps/KidsProp'

const KidsProducts = ({ productFor }) => {
  const kidsCategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Vêtement' },
    { id: 3, name: 'Chemises' },
    { id: 4, name: 'T-shirts' },
    { id: 5, name: 'Pantalon' },
    { id: 6, name: 'Gean' },
    { id: 7, name: 'Shorts' },
    { id: 8, name: 'Sous-vêtes' },
    { id: 9, name: 'Vêtes de nuit' },
    { id: 10, name: 'Hijab' },
    { id: 11, name: 'Foulards' },
    { id: 12, name: 'Collants' },
    { id: 13, name: 'Cravates' },
    { id: 14, name: 'Chaussettes' },
    { id: 15, name: 'Chap-Casquets' },
    { id: 16, name: 'Montres' },
    { id: 17, name: 'Lunettes' },
    { id: 18, name: 'Baskets' },
    { id: 19, name: 'Ceintures' },
    { id: 20, name: 'Sacs à dos' },
    { id: 21, name: 'Crampons' },
    { id: 22, name: 'Souliers' },
    { id: 23, name: 'Sandales' },
    { id: 23, name: 'Bottes' },
    { id: 24, name: 'Talon haut' },
    { id: 25, name: 'Talon bas' },

  ]
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  return (
    <View style={styles.container}>
      <KidsProp productFor={productFor} subCategory={kidsCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />



    </View>
  )
}

export default KidsProducts

const styles = StyleSheet.create({})