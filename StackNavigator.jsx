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
import MyProducts from './screens/admin/myProducts/MyProducts';
import SoldProducts from './screens/admin/myProducts/SoldProducts';
import ProductDetails from './screens/home/productDetails/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from './redux/cartSlice';
import FavoriteSimilarProductScreen from './screens/favorite/FavoriteSimilarProductScreen';
import CheckoutScreen from './screens/cart/CheckoutScreen';
import AddressScreen from './screens/cart/AddressScreen';
import EditProfile from './screens/profile/EditProfile';
import AuthorHomeScreen from './screens/author/AuthorHomeScreen';
import AddLocations from './screens/author/address/AddLocations';

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

                {/* ------------ Profile Screens --------*/}
                <Stack.Screen name='EditProfile' component={EditProfile} 
                options={({ route }) => ({ title: "Modifier le profil", })}
                />
                {/* ------------ Admin Screens --------*/}
                <Stack.Screen name='AdminHomeScreen' component={AdminHomeScreen} options={{ headerShown: true }} />
                <Stack.Screen name='AddNewProduct' component={AddNewProduct} options={{ headerShown: true }} />
                <Stack.Screen name='MyProducts' component={MyProducts} options={{ headerShown: false }} />
                <Stack.Screen name='SoldProducts' component={SoldProducts} options={{ headerShown: false }} />

                {/* ------------ Author Screens --------*/}
                <Stack.Screen name='AuthorHomeScreen' component={AuthorHomeScreen} options={{ headerShown : true }} />
                <Stack.Screen name='AddLocations' component={AddLocations} options={{ headerShown : true }} />

                


            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})