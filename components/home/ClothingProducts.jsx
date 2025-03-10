import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubSubCategoryProp from '../props/home/subSubCategoryProp/SubSubCategoryProp'

const ClothingProducts = () => {
    const beautyCategories = [
        { id: 1, name: "All" },
        { id: 2, name: 'Femme' },
        { id: 3, name: 'Beauté' },
        { id: 4, name: 'Homme' },
        { id: 5, name: 'Bijoux' },
        { id: 6, name: 'Sports' },
        { id: 7, name: 'Enfant' },
        { id: 8, name: 'Bébé' },
        { id: 9, name: 'Électronique' },
        { id: 10, name: 'Maison' },
        { id: 11, name: 'Stationnaire' },
    
      ]
       const [selectedSubCategory, setSelectedSubCategory] = useState("Tout")
     
      return (
        <View style={styles.container}>
          <SubSubCategoryProp subSubCategories={beautyCategories} selectedSubCategory={ selectedSubCategory} setSelectedSubCategory={setSelectedSubCategory} />
        </View>
  )
}

export default ClothingProducts

const styles = StyleSheet.create({})