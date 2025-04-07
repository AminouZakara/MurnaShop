import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home/HomeScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CartScreen from './screens/cart/CartScreen';
import FavoriteScreen from './screens/favorite/FavoriteScreen';
import SearchScreen from './screens/home/SearchScreen';
import AdminHomeScreen from './screens/admin/AdminHomeScreen';
import AddNewProduct from './screens/admin/addNewProduct/AddNewProduct';
import ProductDetails from './screens/home/productDetails/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from './redux/cartSlice';
import FavoriteSimilarProductScreen from './screens/favorite/FavoriteSimilarProductScreen';
import CheckoutScreen from './screens/cart/CheckoutScreen';
import AddressScreen from './screens/cart/AddressScreen';
import EditProfile from './screens/profile/EditProfile';
import AuthorHomeScreen from './screens/author/AuthorHomeScreen';
import AddLocations from './screens/author/address/AddLocations';
import MyOrder from './screens/profile/order/MyOrder';
import SupportScreen from './screens/profile/support/SupportScreen';
import SettingsScreen from './screens/profile/settings/SettingsScreen';
import VotreModePaiement from './screens/profile/settings/VotreModePaiement';
import LangueScreen from './screens/profile/settings/LangueScreen';
import AproposCetteApplication from './screens/profile/settings/AproposCetteApplication';
import ConditionsJuridiquesPolitiques from './screens/profile/settings/ConditionsJuridiquesPolitiques';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();
    const cartItemCount = useSelector((state) => state.cart.items.length);
    console.log("log items length");

    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);
    function MyTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarLabel: 'Home',
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ focused }) => focused ? (
                        <Entypo name="home" size={24} color="#FF9900" />
                    ) : (
                        <Entypo name="home" size={24} color="gray" />
                    )

                }} />
                <Tab.Screen name="Favorite" component={FavoriteScreen} options={{
                    tabBarLabel: 'Favorite',
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ focused }) => focused ? (
                        <FontAwesome name="heart" size={24} color="#FF9900" />
                    ) : (
                        <FontAwesome name="heart" size={24} color="gray" />
                    )
                }} />
                <Tab.Screen name="Cart" component={CartScreen} options={{
                    tabBarLabel: 'Cart',
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ focused }) => <View>
                        <Text style={{
                            position: 'absolute',
                            top: -12,
                            right: 8,
                            fontWeight: "bold", color: focused ? 'gray' : '#FF9900'
                        }}>{cartItemCount > 0 ? cartItemCount : ''}</Text>
                        <MaterialIcons name="shopping-cart" size={24} color={focused ? '#FF9900' : 'gray'} />
                    </View>
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarLabel: 'Profile',
                    tabBarActiveTintColor: '#FF9900',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="person" size={24} color="#FF9900" />
                    ) : (
                        <Ionicons name="person" size={24} color="gray" />
                    )
                }} />
            </Tab.Navigator>
        );
    }
    //color f4511e
    return (
        <NavigationContainer>

            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
                {/*------------ Home Screens --------*/}
                <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false }} />

                <Stack.Screen name='ProductDetails' component={ProductDetails}
                    options={{ headerShown: true }}
                />
                <Stack.Screen name='FavoriteSimilarProductScreen' component={FavoriteSimilarProductScreen}
                    options={({ route }) => ({ title: "Produits similaires", })}
                />
                <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} options={{ headerShown: true }} />
                <Stack.Screen name='AddressScreen' component={AddressScreen}
                    options={({ route }) => ({ title: "Adresse de livraison", })}
                />

                {/* Profile Screens --------*/}
               
                {/* ------------ Support --------*/}
                <Stack.Screen name='SupportScreen' component={SupportScreen} options={{ headerShown: true }} />
                {/* ------------ Settings --------*/}
                <Stack.Screen name='SettingsScreen' component={SettingsScreen} options={{ headerShown: true }} />
                <Stack.Screen name='EditProfile' component={EditProfile} 
                options={({ route }) => ({ title: "Modifier le profil", })}
                />
                <Stack.Screen name='VotreModePaiement' component={VotreModePaiement} options={{ headerShown: true }} />
                <Stack.Screen name='LangueScreen' component={LangueScreen} options={{ headerShown: true }} />
                <Stack.Screen name='AproposCetteApplication' component={AproposCetteApplication} options={{ 
                    headerTitle: 'Apropos de cette application',
                 }} />
                <Stack.Screen name='ConditionsJuridiquesPolitiques' component={ConditionsJuridiquesPolitiques} options={{ headerShown: true }} />

                {/* ------------ Order --------*/}
                <Stack.Screen name='MyOrder' component={MyOrder} options={{ headerShown: true }} />



                {/* ------------ Admin Screens --------*/}
                <Stack.Screen name='AdminHomeScreen' component={AdminHomeScreen} options={{ headerShown: true }} />
                <Stack.Screen name='AddNewProduct' component={AddNewProduct} options={{ headerShown: true }} />
                {/* <Stack.Screen name='OrderDetails' component={OrderDetails} options={{ headerShown: true }} /> -*/}


                {/* ------------ Author Screens --------*/}
                <Stack.Screen name='AuthorHomeScreen' component={AuthorHomeScreen} options={{ headerShown : true }} />
                <Stack.Screen name='AddLocations' component={AddLocations} options={{ headerShown : true }} />

                


            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})