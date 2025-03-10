import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const MaisonProducts = ({category}) => {
    const maisonCategories = [
        { id: 1, name: "Tout" },
        { id: 2, name: 'Chambre à coucher' },
        { id: 3, name: 'Cuisine' },
        { id: 4, name: 'Salle à manger' },
        { id: 5, name: 'Salon' },
        { id: 6, name: 'Toilettes' },
        { id: 7, name: 'Tapis' },
        { id: 8, name: 'Salle de bain' },
        { id: 9, name: 'Produits de nettoyage' },
        { id: 10, name: 'Autre' },
    
      ]
      const [selectedCategory, setSelectedCategory] = useState("Tout")
      return (
        <View style={styles.container}>
          <SubCategoryProp subCategory={maisonCategories} selectedCategory={ selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList category={category} subCategory={selectedCategory} />

        </View>
  )
}

export default MaisonProducts

const styles = StyleSheet.create({})