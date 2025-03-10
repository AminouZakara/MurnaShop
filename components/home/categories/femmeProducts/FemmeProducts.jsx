import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const FemmeProducts = ({category}) => {

  const womencategories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Vêtement' },
    { id: 3, name: 'Sous-vêtes' },
    { id: 4, name: 'Vêtes de nuit' },
    { id: 5, name: 'Hijab' },
    { id: 6, name: 'Foulards' },
    { id: 7, name: 'Chemises' },
    { id: 8, name: 'T-shirts' },
    { id: 9, name: 'Pantalon' },
    { id: 9, name: 'Collants' },
    { id: 10, name: 'Gean' },
    { id: 11, name: 'Shorts' },
    { id: 12, name: 'Chaussettes' },
    { id: 13, name: 'Chap-Casquets' },
    { id: 14, name: 'Bijoux' },
    { id: 15, name: 'Montres' },
    { id: 16, name: 'Lunettes' },
    { id: 17, name: 'Sport' },
    { id: 18, name: 'Talon haut' },
    { id: 19, name: 'Talon bas' },
    { id: 20, name: 'Sandales' },
    { id: 21, name: 'Bottes' },
    { id: 22, name: 'Ceintures' },
    { id: 23, name: 'Sacs à main' },
    { id: 24, name: 'Sacs à dos' },
    { id: 25, name: 'Sacs de poitrine' },
    { id: 26, name: 'Portefeuille' },
    { id: 27, name: 'Maquillage' },
    { id: 28, name: 'Perruques' },
    { id: 29, name: 'Rasage' },
    { id: 30, name: 'Pommade' },
    { id: 31, name: 'Parfum' },
    { id: 32, name: 'Trous-toilette' },
    { id: 33, name: 'Manu-Pédicure' },
    { id: 34, name: 'Outils de beauté' },
    { id: 35, name: 'Baskets' },
  ]
  // shuffle array but keep the first element at the beginning
  //const shuffled = womencategories.slice(1).sort(() => Math.random() - 0.5).concat([womencategories[0]])

  const [selectedCategory, setSelectedCategory] = useState("Tout")

  return (
    
    <View style={styles.container}>
      <SubCategoryProp subCategory={womencategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

    </View>

  )
}

export default FemmeProducts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})