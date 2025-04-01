import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GenderProp from '../../../props/home/genderProps/GenderProp'

const GarconsProducts = ({category, productFor }) => {
    const garconsCategories = [
        { id: 1, name: "Tout" },
        { id: 2, name: 'Vêtement' },
        { id: 3, name: 'Chemises' },
        { id: 4, name: 'T-shirts' },
        { id: 5, name: 'Pantalon' },
        { id: 6, name: 'Gean' },
        { id: 7, name: 'Shorts' },
        { id: 8, name: 'Sous-vêtes' },
        { id: 9, name: 'Vêtes de nuit' },
        { id: 10, name: 'Cravates' },
        { id: 11, name: 'Chaussettes' },
        { id: 12, name: 'Chap-Casquets' },
        { id: 13, name: 'Montres' },
        { id: 14, name: 'Lunettes' },
        { id: 15, name: 'Baskets' },
        { id: 16, name: 'Crampons' },
        { id: 17, name: 'Souliers' },
        { id: 18, name: 'Sandales' },
        { id: 19, name: 'Bottes' },
        { id: 20, name: 'Ceintures' },
        { id: 21, name: 'Sacs à dos' },
    
      ]
      const [selectedCategory, setSelectedCategory] = useState("Tout")
      return (
        <View style={styles.container}>
          <GenderProp productFor={productFor} category={category} subCategory={garconsCategories} selectedCategory={ selectedCategory} setSelectedCategory={setSelectedCategory} />
          

        </View>
  )
}

export default GarconsProducts

const styles = StyleSheet.create({})