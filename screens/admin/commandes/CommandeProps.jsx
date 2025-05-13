import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CommandeProps = ({ myOrders, errorOrders }) => {
    const navigation = useNavigation();
    console.log("myOrders", myOrders);
    const cartItems = myOrders.map((order) => order.cartItems).flat();
    console.log("cartItems", cartItems);
    return (
        <View style={{ flex: 1 }}>
            {myOrders.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Aucune commande trouvée</Text>
                </View>
            ) : (
                myOrders.map((order) => (
                    <View key={order.id} style={{ paddingVertical: 10, width: "100%", paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                        {
                            order.cartItems.map((item) => (
                                <View key={item.id} style={{ width: "100%", flexDirection: "row", }}>
                                    <View style={{ width: "22%", }}>
                                        <Text style={{ fontWeight: "500", fontSize: 12, }}>
                                            {order.orderDate.toDate().toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={
                                                () => navigation.navigate('ProductDetails', {
                                                    productTitle: item.name,
                                                    product: order,
                                                    id: item.productId,
                                                })
                                            }
                                        >
                                            <Image source={{ uri: order.productImage }} style={{ width: 80, height: 80 }} />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ width: "78%", marginLeft: 1, flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                                        <View style={{ width: "70%", paddingLeft: 6, }}>
                                            <Text style={{ fontSize: 14, fontWeight: "500" }}>{item.name} Ume nbell robe de nuit enseble de chaussures pour femmme cet jolie</Text>
                                                    <Text>Prix: <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.price}</Text></Text>

                                                    <Text>Quantité: <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.quantity}</Text></Text>
                                            {
                                                item?.size && (
                                                    <Text>Taille: <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.size}</Text></Text>
                                                )
                                            }
                                            {
                                                item?.color && (<View style={{ flexDirection: "row", alignItems: "center", }}>
                                                    <Text>Couleur: <Text style={{ color: item.color, fontSize: 16, fontWeight: "500" }}>{item.color}</Text></Text>
                                                    <View style={{ marginLeft: 10, padding: 10, width: 20, height: 20, borderRadius: 20, backgroundColor: item.color }} />
                                                </View>)
                                            }
                                        </View>

                                        <View style={{ width: "30%", justifyContent: "space-between", marginTop: 5 }}>
                                            {order.status === "pending" && (
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('CommandeDetails', {
                                                        orderId: order.id,
                                                        order: order,
                                                        item: item,
                                                        orderStatus: order.status,
                                                    })}
                                                    style={{ backgroundColor: "green", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 12, fontWeight: "500" }}>Confirmé</Text>
                                                </TouchableOpacity>
                                            )}
                                            {order.status === "confirmed" && (
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('CommandeDetails', {
                                                            orderId: order.id,
                                                            order: order,
                                                            item: item,
                                                            orderStatus: order.status,
                                                        })}
                                                        style={{ backgroundColor: "green", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 12, fontWeight: "500" }}>Pres</Text>
                                                    </TouchableOpacity>
                                                    {
                                                        order.shared && (
                                                            <View style={{ marginTop: 20 }}>
                                                                <Text style={{ textAlign: "center", color: "#FF9900", fontSize: 14, fontWeight: "600" }}>Commande Partagée</Text>
                                                            </View>
                                                        )
                                                    }


                                                </View>

                                            )}

                                            {order.status === "shipped" && (
                                                <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                    <Text style={{ textAlign: "center", color: "#FF9900", fontSize: 16, fontWeight: "800" }}>Expédié</Text>
                                                </View>
                                            )}
                                            {order.status === "delivered" && (
                                                <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                    <Text style={{ textAlign: "center", color: "green", fontSize: 16, fontWeight: "800" }}>Livré</Text>
                                                </View>
                                            )}
                                            {order.status === "returned" && (
                                                <View>
                                                    <TouchableOpacity style={{ backgroundColor: "green", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 12, fontWeight: "500" }}>Remboursé</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "green", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 12, fontWeight: "500" }}>Échoué</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            {order.status === "refunded" && (
                                                <View style={{ backgroundColor: "green", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 12, fontWeight: "500" }}>Échoué</Text>
                                                </View>
                                            )}
                                            {order.status === "failed" && (
                                                <View style={{ backgroundColor: "green", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 12, fontWeight: "500" }}>Échoué</Text>
                                                </View>
                                            )}

                                            <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "800" }}>{order.totalAmount} <Text style={{color:"grey"}}>FCFA</Text> </Text>
                                        </View>


                                    </View>

                                </View>
                            ))
                        }


                    </View>

                ))
            )}
            {
                errorOrders && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>Error: {errorOrders.message}</Text>
                    </View>
                )
            }
        </View >
    )
}

export default CommandeProps

const styles = StyleSheet.create({})