import { StyleSheet } from 'react-native'
import React from 'react'
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

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

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
                    tabBarIcon: ({ focused }) => focused ? (
                        <MaterialIcons name="shopping-cart" size={24} color="#FF9900" />
                    ) : (
                        <MaterialIcons name="shopping-cart" size={24} color="gray" />
                    )
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

                {/* ------------ Admin Screens --------*/}
                <Stack.Screen name='AdminHomeScreen' component={AdminHomeScreen} options={{ headerShown: true }} />
                <Stack.Screen name='AddNewProduct' component={AddNewProduct} options={{ headerShown: true }} />
                <Stack.Screen name='MyProducts' component={MyProducts} options={{ headerShown: false }}/>  
                <Stack.Screen name='SoldProducts' component={SoldProducts} options={{ headerShown: false }}/>  



            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})