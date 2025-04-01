import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/home/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavorites, removeFromFavorites } from '../../redux/favoriteSlice';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const FavoriteScreen = () => {
  const dispatch = useDispatch();

  //load Favorite
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]); 
  const navigation = useNavigation();
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerStyle: {
        backgroundColor: "#FF9900",
        borderBottomColor: "transparent",
        shadowColor: "transparent"
      },
    });
  }, [navigation]);

    
  const favorites = useSelector((state) => state.favorites.items);
   
  console.log("Favorite", favorites.length);
 // onPress={() => dispatch(removeFromFavorites(item.id))

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}>
         {
           favorites.length > 0 ? (
             <ScrollView>
               {
                 favorites.map((item, index) => {
                   return (
                     <View
                       key={index}
                       style={{ backgroundColor: "white", width: "100%", flexDirection: "row", padding: 10, marginVertical: 5, }}>
                       <TouchableOpacity
                         onPress={
                           () => navigation.navigate('ProductDetails', {
                             productTitle: item.title,
                             product: item,
                             id: item.id,
                           })
                         }
                         style={{ width: "30%" }}>
                         <Image source={{ uri: item.images[0] }} style={{ width: 100, height: 100 }} />
                       </TouchableOpacity>
   
                       <View style={{ width: "70%", gap: 40 }}>
                         <View style={{ flexDirection: "row" }}>
                           <View style={{ width: "80%", }}>
                             <Text
                               numberOfLines={1}
                               ellipsizeMode="tail"
                               style={{ fontSize: 14, color: "grey" }}>{item.title}</Text>
                           </View>
   
                           <TouchableOpacity onPress={() => dispatch(removeFromFavorites(item.id))} style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                             <FontAwesome name="trash-o" size={24} color="grey" />
                           </TouchableOpacity>
                         </View>
   
                         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                           <View >
                             <Text style={{ fontSize: 18, }}>{item.price} <Text style={{ color: "grey", fontSize: 10 }}>FCFA</Text></Text>
                           </View>
   
                           <View style={{backgroundColor : "#f0f0f0", padding: 5, borderRadius: 5, }}>
                             <TouchableOpacity
                               onPress={() => navigation.navigate('FavoriteSimilarProductScreen', {
                                productType: item.productType,
                              })}
                             >
                               <Text style={{ fontSize: 14, color: "green", fontWeight: "bold" }}>Produits similaires</Text>
                             </TouchableOpacity>
                           </View>
                         </View>
                       </View>
   
   
                     </View>
                   )
                 })
               }
             </ScrollView>
           ) : (
             <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
               <Text style={{ fontSize: 24, color: "grey" }}>Votre favorite est vide</Text>
               <TouchableOpacity
                   style={{
                     height: 40,
                     marginVertical: 20,
                     paddingHorizontal: 8,
                     backgroundColor: "#FF9900",
                     justifyContent: "center",
                     alignSelf: "center",
                     alignItems: "center",
                     borderRadius: 10,
                   }}
                   onPress={() => navigation.navigate("Main", { screen: "Home" })}>
                   <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>Commençer à acheter</Text>
                 </TouchableOpacity>
             </View>
           )}
   
       </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({})