import { Alert, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



const CommandeDetails = () => {
    const navigation = useNavigation();
    const { orderId, order, item, orderStatus } = navigation.getState().routes[navigation.getState().index].params;
    console.log("CommandeDetails", orderId, order, item, orderStatus);
    useLayoutEffect(() => {
        // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
        navigation.setOptions({
            headerTitle: () => (<View
                style={{ marginLeft: 30 }}
            >
                <Text style={{ color: "#FF9900", fontSize: 18 }}>Détails de la commande</Text>
            </View>),
            headerStyle: {
                backgroundColor: "white",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 18,
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, }}>
                    <Icon name="arrow-back" size={24} color="#FF9900" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const productId = item.productId;
    //console.log("productId", productId);
    console.log("oderId", orderId);
    

    //get the product
    const [product, setProduct] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    const getProduct = async () => {
        setLoadingProduct(true);
        try {
            const userRef = doc(db, 'murnaShoppingPosts', productId);
            const product = await getDoc(userRef);
            setProduct({ ...product.data(), id: product.id });
            setLoadingProduct(false);
        }
        catch (error) {
            console.log("error", error);
            setLoadingProduct(false);
        }

    }
    useEffect(() => {
        getProduct();
    }, []);

   // console.log("product", product);
    //console.log("product", product?.quantity);


    //update the order status to "confirmed" when the user click on the button
    const [updateStatus, setUpdateStatus] = useState(false);
    const [updateProduct, setUpdateProduct] = useState(false);

    // convert the quantity to number
    //console.log("remaning quantity", Number(product?.quantity) - Number(item.quantity));
    

     //update product quantity
    const updateProductQuantity = async () => {
        setUpdateProduct(true);
        try {
            const productRef = doc(db, "murnaShoppingPosts", productId);
            await updateDoc(productRef, {
                quantity: Number(product?.quantity) - Number(item.quantity),
            });
            console.log("Product quantity updated");
            setUpdateProduct(false);
        }
        catch (error) {
            console.log("Error updating product quantity: ", error);
            setUpdateProduct(false);
        }
    }

    const updateOrderStatus = async () => {
        //check if the product quantity is greater than 0
        if (Number(product?.quantity) - Number(item.quantity) < 0) {
            Alert.alert("Quantité insuffisante", "La quantité de produit est insuffisante", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("AdminHomeScreen")
                }
            ]);
            return;
        }
        setUpdateStatus(true);
        try {
            const orderRef = doc(db, "murnaShoppingOrders", orderId);
            await updateDoc(orderRef, {
                status: "confirmed",
                confirmedDate: new Date(),
            });
            await updateProductQuantity();
            console.log("Order status updated to confirmed");
            setUpdateStatus(false);
            Alert.alert("Commande confirmée", "La commande a été confirmée avec succès", [
                {
                    text: "OK",
                    onPress: () =>
                        navigation.navigate("AdminHomeScreen")
                }
            ]);

        }
        catch (error) {
            console.log("Error updating order status: ", error);
            setUpdateStatus(false);
        }
    }
    


    const shareProduct = () => {
        Share.share({
            //set the message in 3 lines
            message: `${orderId}`,
        })
            .then(result => console.log(result))
            .catch(error => console.error(error));
    }
    return (
        <View style={styles.container}>
            {loadingProduct ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: "#FF9900" }}>Loading...</Text>
                </View>
            ) : (
                <View>
                    {product && (
                        <>
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>Détails de la commande</Text>
                            <Text style={{ alignSelf: "flex-end", fontWeight: "500", fontSize: 12, marginRight: 10, }}>
                                {order.orderDate.toDate().toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </Text>

                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={
                                        () => navigation.navigate('ProductDetails', {
                                            productTitle: item.name,
                                            product: order,
                                            id: item.productId,
                                        })
                                    }
                                    style={{}}
                                >
                                    <Image source={{ uri: order.productImage }} style={{
                                        backgroundColor: "white",
                                        alignSelf: "center",
                                        width: '100%',
                                        height: 400,
                                    }} />
                                </TouchableOpacity>

                                <View style={{ paddingLeft: 6, gap: 10, paddingVertical: 10, paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 10, marginTop: -20, marginBottom: 20 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.name} </Text>
                                    <Text style={{ fontSize: 16, fontWeight: "500" }}>Prix: {item.price}</Text>
                                    <Text>Quantité: <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.quantity}</Text></Text>
                                    {
                                        item?.size && (
                                            <Text>Taille: <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.size}</Text></Text>
                                        )
                                    }
                                    {
                                        item?.color && (<View style={{ flexDirection: "row", alignItems: "center", }}>
                                            <Text>Couleur: <Text style={{ color: item.color, fontSize: 16, fontWeight: "500" }}>{item.color}</Text></Text>
                                            <View style={{ marginLeft: 10, padding: 10, width: 35, height: 35, borderRadius: 20, backgroundColor: item.color }} />
                                        </View>)
                                    }


                                </View>
                            </View>

                            {
                                orderStatus === "pending" && (<TouchableOpacity
                                    onPress={updateOrderStatus}
                                    disabled={updateStatus}
                                    activeOpacity={0.7}
                                    style={{
                                        backgroundColor: "#FF9900",
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 5,
                                        alignSelf: "center",
                                        marginBottom: 20,
                                    }}>
                                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>{updateStatus ? "Mise à jour..." : "Confirmer la commande"}</Text>
                                </TouchableOpacity>)
                            }


                            {
                                orderStatus === "confirmed" && (
                                    <TouchableOpacity
                                        onPress={() => shareProduct()}
                                        activeOpacity={0.7}
                                        style={{
                                            backgroundColor: "#FF9900",
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            borderRadius: 5,
                                            alignSelf: "center",
                                            marginBottom: 20,
                                            flexDirection: "row",
                                        }}>
                                        <Ionicons name="share-social-sharp" size={24} color="#fff" style={{ marginRight: 15 }} />

                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>Partager la commande</Text>
                                    </TouchableOpacity>
                                )
                            }

                            <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 10 }} />


                        </>
                    )}
                </View>
            )}
        </View>
    )
}

export default CommandeDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})