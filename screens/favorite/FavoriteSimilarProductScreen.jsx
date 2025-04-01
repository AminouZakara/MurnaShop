import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { db } from '../../firebaseConfig'
import ProductList from '../../components/props/home/productLists/ProductList'

const FavoriteSimilarProductScreen = () => {
    const route = useRoute()
    const favoriteSimilarProduct = route.params.productType
    console.log("favorite Similar Product Type:", favoriteSimilarProduct);

    useEffect(() => {
        getFavoriteSimilarProduct()
    }, [])
    const [loading, setLoading] = useState(true)
    const [favoriteSimilarProductList, setFavoriteSimilarProductList] = useState([])
    const getFavoriteSimilarProduct = async () => {
        setLoading(true)
        try {
            const q = query(collection(db, 'murnaShoppingPosts'), where("productType", "==", favoriteSimilarProduct))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setFavoriteSimilarProductList(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    console.log("favoriteSimilarProductList", favoriteSimilarProductList);
    return (
        <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        >
            <ProductList productLists={favoriteSimilarProductList}  />

        </ScrollView>
    )
}

export default FavoriteSimilarProductScreen

const styles = StyleSheet.create({})