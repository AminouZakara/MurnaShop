import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubCategoryProp from '../../../props/home/subCategoryProp/SubCategoryProp'
import ProductList from '../../../props/home/productLists/ProductList'

const VetementsProducts = ({ category }) => {
    const vetementsCategories = [
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
        { id: 12, name: 'Cravates' },
        { id: 13, name: 'Chaussettes' },
        { id: 14, name: 'Chap-Casquets' },

    ]
    const [selectedCategory, setSelectedCategory] = useState("Tout")
    return (
        <View style={styles.container}>
            <SubCategoryProp category={category} subCategory={vetementsCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        </View>
    )
}

export default VetementsProducts

const styles = StyleSheet.create({})