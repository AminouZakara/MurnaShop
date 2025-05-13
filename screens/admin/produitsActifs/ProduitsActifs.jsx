import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from 'react-redux';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ProductList from '../../../components/props/home/productLists/ProductList';
import AdminProducts from '../AdminProducts';



const ProduitsActifs = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => (<View
        style={{ marginLeft: 30 }}
      >
        <Text style={{ color: "#FF9900", fontSize: 18 }}>Mes Commandes</Text>
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

  //get user data from redux
  const { userData, loading, error } = useSelector(state => state.user);
  const userId = userData?.userId;
  //console.log("userData", userData);
  const [myOrders, setMyOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);
  const getMyOrders = async () => {
    setLoadingOrders(true);
    setErrorOrders(null);
    try {
      // get the userId from the userData
      const orders = await getDocs(query(collection(db, "murnaShoppingPosts"), where("storeId", "==", userId)));
      // set the orders to the state
      setMyOrders(orders.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoadingOrders(false);
    }
    catch (error) {
      console.log("error", error);
      setErrorOrders(error);
    }
    finally {
      setLoadingOrders(false);
    }
  }
  useLayoutEffect(() => {
    getMyOrders();
  }, []);
  // if loading is true, show a loading indicator
  if (loadingOrders) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // console.log("myOrders", myOrders);

  // query(collection(db, "MurnaShoppingOrders"), where("userId", "==", currentUser.uid))
  return (
    <View style={{ }}>
      {myOrders.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Aucun produit trouvé</Text>
        </View>
      ) : (
        <View style={{paddingHorizontal:4,}}>
          <Text style={{marginBottom:2, fontSize:16}}>Vous avez <Text style={{color:"green", fontWeight:"bold", fontSize:16}}> {myOrders.length} </Text> produits que pouvez gérer ici.</Text>
          
          <AdminProducts productLists={myOrders} />
        </View>
      )}
      {errorOrders && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Error: {errorOrders.message}</Text>
        </View>
      )}


    </View>
  )
}

export default ProduitsActifs

const styles = StyleSheet.create({

})