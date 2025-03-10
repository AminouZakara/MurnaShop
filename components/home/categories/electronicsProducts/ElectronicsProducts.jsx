import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const ElectronicsProducts = ({category}) => {
  const electronicsCategories = [
    { id: 1, name: "All" },
    { id: 2, name: 'Téléphone' },
    { id: 3, name: 'Tablette' },
    { id: 4, name: 'Ordinateur portable' },
    { id: 5, name: 'Ordinateur de bureau' },
    { id: 7, name: 'Scanner et photocopieuse' },
    { id: 8, name: 'Caméra' },
    { id: 9, name: 'Écouteurs' },
    { id: 10, name: 'Réfrigérateur' },
    { id: 11, name: 'Congélateur' },
    { id: 12, name: 'Fontaine à eau' },
    { id: 13, name: 'Machine à laver' },
    { id: 14, name: 'Lave-vaisselle' },
    { id: 15, name: 'Séchoir' },
    { id: 16, name: 'climatisation' },
    { id: 17, name: 'Télévision' },
    { id: 18, name: 'Mixeur' },
    { id: 19, name: 'Friteuse à air' },
    { id: 20, name: 'Four et micro-onde' },
    { id: 21, name: 'Four encastrable' },
    { id: 22, name: 'Fer à repasser' },
    { id: 23, name: 'Fer à lisser' },
    { id: 24, name: 'Aspirateur' },
    { id: 25, name: 'Sèche-cheveux' },
    { id: 26, name: 'Radio-audio et baffle' },
    { id: 27, name: "Accessoires d'ordinateur" },
    { id: 28, name: "Accessoires de tablette" },
    { id: 29, name: "Accessoires de téléphone" },
    { id: 30, name: "Accessoires de caméra" },
    { id: 31, name: 'Power bank et batteries' },
    { id: 32, name: 'Multiprises' },
    { id: 33, name: 'Stockage de données' },
    { id: 34, name: 'Jeux vidéos' },
    { id: 35, name: 'Éclair' },
    { id: 36, name: 'Autre' },


  ]
  const [selectedCategory, setSelectedCategory] = useState("All")
  return (
    <View style={styles.container}>
      <SubCategoryProp subCategory={electronicsCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

    </View>
  )
}

export default ElectronicsProducts

const styles = StyleSheet.create({})