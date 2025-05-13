import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AntDesign from '@expo/vector-icons/AntDesign';


const AdminProducts = ({ productLists }) => {
    const navigation = useNavigation()

    //console.log("AdminProducts", productLists)
    //console.log("AdminProducts", productLists.length)

    const [isDeleting, setIsDeleting] = useState(false);
    const onDeleteMethod = async (id) => {
        setIsDeleting(true);
        try {
            const docRef = doc(db, "murnaShoppingPosts", id);
            await deleteDoc(docRef);
            Alert.alert(
                "Success",
                "Your post has been deleted successfully!",
                [

                    {
                        text: 'OK', onPress: () => console.log("Your post has been deleted successfully!")
                    },

                ]
            );
            setIsDeleting(false);
            console.log("Post deleted successfully");
            console.log("id", id);
        }
        catch (error) {
            console.error("Error deleting post:", error);
            Alert.alert(
                "Erreur",
                "Something went wrong while deleting the post.",
                [{ text: "OK" }]
            );
            setIsDeleting(false);
        }
    }
    return (
        <View style={{ backgroundColor: '#f0f0f0' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 8, paddingBottom: 20 }}>
                {
                    productLists.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{ flexDirection: "row", marginVertical: 10, }}>
                                <View style={{ flexDirection: "row", backgroundColor: "white", }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => navigation.navigate('ProductDetails', {
                                                productTitle: item.title,
                                                product: item,
                                                id: item.id,
                                            })
                                        }
                                        style={{ width: "30%" }}>
                                        <Image source={{ uri: item.images[0] }} style={{ width: 110, height: 110 }} />
                                    </TouchableOpacity>

                                    <View style={{paddingHorizontal:8, width: "60%",  justifyContent: "space-between", paddingVertical: 4 }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{ fontSize: 14, fontWeight: "700", }}>{item.title}</Text>
                                        <Text style={{ fontSize: 14, fontWeight:"bold", color:"#FF9900" }}>{item.price} <Text style={{ color: "grey", fontSize: 10, fontWeight:"500" }}>FCFA</Text></Text>
                                        <Text style={{ fontSize: 14, fontWeight:"bold" }}>{item.quantity} <Text style={{ color: "grey", fontSize: 12, fontWeight:"400" }}>en stock</Text></Text>
                                        <FontAwesome name="star" size={14} color="orange" />
                                    </View>
                                    <View style={{ width: "10%", justifyContent: "space-between", alignItems: "center", paddingVertical: 4 }}>
                                        <TouchableOpacity onPress={
                                            () => navigation.navigate('AddNewProduct', {
                                                productTitle: item.title,
                                                product: item,
                                                id: item.id,
                                            })
                                        } >
                                            <AntDesign name="edit" size={30} color="green" />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => onDeleteMethod(item.id)} disabled={isDeleting}>
                                            {isDeleting ? <FontAwesome name="spinner" size={28} color="red" /> :
                                                <FontAwesome name="trash-o" size={20} color="red" />}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }


            </ScrollView>
        </View>
    )
}

export default AdminProducts

const styles = StyleSheet.create({})