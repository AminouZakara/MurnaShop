import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home/HomeScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import AddQuiz from './screens/home/quiz/AddQuiz';
import JoinChallenge from './screens/challenge/JoinChallenge';
import ChallengeScreen from './screens/challenge/ChallengeScreen';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function MyTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => focused ? (
                        <Entypo name="home" size={24} color="blue" />
                    ) : (
                        <AntDesign name="home" size={24} color="black" />
                    )
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="person" size={24} color="blue" />
                    ) : (
                        <Ionicons name="person-outline" size={24} color="black" />
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
                {/*------------ Challenge --------*/}
                <Stack.Screen name="JoinChallenge" component={JoinChallenge} options={{ 
                    headerShown: true,
                    title: 'Free Courses',
                    headerTitleStyle: {
                        fontSize: 20,
                        color: "white"
                    },
                    headerStyle : {
                        backgroundColor: 'blue',
                    }
                    }}/>
                <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} options={{ 
                    headerShown: true,
                    title: 'Get Your Free Courses',
                    headerTitleStyle: {
                        fontSize: 20,
                        color: "white"
                    },
                    headerStyle : {
                        backgroundColor: 'blue',
                    }
                    }}/>

                {/*------------ Quiz --------*/}
                <Stack.Screen name="AddQuiz" component={AddQuiz} options={{ 
                    headerShown: true,
                    title: 'Add Quiz',
                    headerTitleStyle: {
                        fontSize: 20,
                        color: "white"
                    },
                    headerStyle : {
                        backgroundColor: 'blue',
                    }
                    
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})