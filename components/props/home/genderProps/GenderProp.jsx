import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductList from '../productLists/ProductList'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

const GenderProp = ({ category, productFor, subCategory, selectedCategory, setSelectedCategory }) => {

    const [calledProducts, setCalledProducts] = useState([]);
    const [loading, setLoading] = useState(true)


    // get prodcutFor from the database
    useEffect(() => {
        getCalledProducts();
    }, [])
    const getCalledProducts = async () => {
        setLoading(true)
        try {
            const q = query(collection(db, "murnaShoppingPosts"), where("productFor", "==", productFor));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setCalledProducts(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    console.log("products:", calledProducts);

    
        const [filteredProducts, setFilteredProducts] = useState([]);
        useEffect(
            () => {
                if (calledProducts.length > 0) {
                    if (selectedCategory === "Tout") {
                        setFilteredProducts(calledProducts)
                    } else {
                        const filteredProducts = calledProducts.filter((product) => product.productType == selectedCategory);
                        setFilteredProducts(filteredProducts);
                    }
                    
    
                }
            },
            [calledProducts, productFor, subCategory]
        );
    
        //console.log("filteredProducts:", filteredProducts);
  return (
    <View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                    flexDirection: 'row',
                }}>
                {subCategory.map((category, index) => (
                    <TouchableOpacity
                        key={index}

                        style={{
                            //if the item is selected, change the color
                        }}
                        onPress={() => { setSelectedCategory(category.name) }}
                    >
                        <View
                            style={styles.category}

                        >
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: category?.icon }} style={styles.image} />
                            </View>
                            <Text style={{ textAlign: "center", fontSize: 12, color: selectedCategory === category.name ? '#FF9900' : '#000' }}>{category.name}</Text>
                        </View>

                    </TouchableOpacity>
                ))}

            </ScrollView>

            <Text>category: {category} </Text>
            <Text>productFor: {productFor} </Text>
            <Text>selectedCategory: {selectedCategory} </Text>
            <ProductList productFor={productFor} subCategory={selectedCategory} productLists={filteredProducts} />

        </View>
  )
}

export default GenderProp

const styles = StyleSheet.create({
    category: {
        marginVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        width: 87,
        height: 80,
        marginRight: 10,

    },
    imageContainer: {
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderWidth: 0.2,
        borderColor: "green",
        borderRadius: 70,
        elevation: 1.8,
        shadowColor: "green",
        shadowOpacity: 0.8,
        shadowOffset: 10


    },
    image: {
        width: 50,
        height: 50,

    },
})