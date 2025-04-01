import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import ProductList from '../../../components/props/home/productLists/ProductList'

const SimilarProducts = ({ productType, id }) => {

    console.log("id:", id);
    
    useEffect(() => {
        getSimilarProducts()
    }, [])
    const [similarProducts, setSimilarProducts] = React.useState([])
    const [loading, setLoading] = useState(true)
    const getSimilarProducts = async () => {
        setLoading(true)
        try {
            const q = query(collection(db, 'murnaShoppingPosts'),  where("productType", "==", productType))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setSimilarProducts(data)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
   // console.log("similarProducts", similarProducts);
    // filter products by productType and id
    const filteredProducts = similarProducts.filter((product) => product.id !== id)

    return (
            <ScrollView 
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            >
                <ProductList productLists={filteredProducts} loading={loading} />
            </ScrollView>
        )
    }

    export default SimilarProducts

    const styles = StyleSheet.create({
        contentContainerStyle: {
            
            },
    })