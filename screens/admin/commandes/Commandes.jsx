import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from 'react-redux';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ScrollView } from 'react-native';
import Pendings from './commandeComponents/Pendings';
import Confirmed from './commandeComponents/Confirmed';
import Processing from './commandeComponents/Processing';
import Shipped from './commandeComponents/Shipped';
import Delivered from './commandeComponents/Delivered';
import Cancelled from './commandeComponents/Cancelled';
import Returned from './commandeComponents/Returned';
import Refunded from './commandeComponents/Refunded';
import Failed from './commandeComponents/Failed';



const Commandes = () => {
  const navigation = useNavigation();
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
      const orders = await getDocs(query(collection(db, "murnaShoppingOrders"), where("storeId", "==", userId)));
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

  console.log("myOrders", myOrders.length);

  // query(collection(db, "MurnaShoppingOrders"), where("userId", "==", currentUser.uid))
  const orderStatusENg = [
    { id: 1, name: "pending" },
    { id: 2, name: "confirmed" },
    { id: 3, name: "processing" },
    { id: 4, name: "shipped" },
    { id: 5, name: "delivered" },
    { id: 6, name: "cancelled" },
    { id: 7, name: "returned" },
    { id: 8, name: "refunded" },
    { id: 9, name: "failed" },
  ];
  const orderStatus = [
    { id: 1, name: "En attente" },
    { id: 2, name: "En cours de traitement" },
    { id: 3, name: "Expédié" },
    { id: 4, name: "Livré" },
    { id: 5, name: "Annulé" },
    { id: 6, name: "Retourné" },
    { id: 7, name: "Remboursé" },
    { id: 8, name: "Échoué" },
  ]
  {/* 
      const orderStatusMap = orderStatus.reduce((acc, status) => {
        acc[status.name] = status.id;
        return acc;
    }, {});
    console.log("orderStatusMap", orderStatusMap);
    */}
    const [selectedStatus, setSelectedStatus] = useState('En attente')

  return (
    <View>
        <ScrollView
                contentContainerStyle={{ paddingVertical: 10 }}
            >
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

                    style={{
                        flexDirection: 'row',
                    }}>
                    {orderStatus.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedStatus(item.name)}
                            style={{
                                backgroundColor: selectedStatus === item.name ? "#FF9900" : "#fff",
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                margin: 10,
                                borderRadius: 5,
                            }}>
                            <Text style={{
                                color: selectedStatus === item.name ? "#fff" : "#000",

                            }}>{item.name}</Text>
                        </TouchableOpacity>))}
                </ScrollView>

                {selectedStatus === 'En attente' && (<Pendings myOrders={myOrders} errorOrders={errorOrders} loadingOrders={loadingOrders} />)}
                {selectedStatus === 'En cours de traitement' && (<Processing  myOrders={myOrders} errorOrders={errorOrders}  />)}
                {selectedStatus === 'Expédié' && (<Shipped  myOrders={myOrders} errorOrders={errorOrders}  />)}
                {selectedStatus === 'Livré' && (<Delivered  myOrders={myOrders} errorOrders={errorOrders}   />)}
                {selectedStatus === 'Annulé' && (<Cancelled myOrders={myOrders} errorOrders={errorOrders}  />)}
                {selectedStatus === 'Retourné' && (<Returned  myOrders={myOrders} errorOrders={errorOrders}  />)}
                {selectedStatus === 'Remboursé' && (<Refunded  myOrders={myOrders} errorOrders={errorOrders}  />)}
                {selectedStatus === 'Échoué' && (<Failed  myOrders={myOrders} errorOrders={errorOrders}  />)}
                
            </ScrollView>


    </View>
  )
}

export default Commandes

const styles = StyleSheet.create({

})