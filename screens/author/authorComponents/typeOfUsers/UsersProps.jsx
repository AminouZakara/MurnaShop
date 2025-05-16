import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const UsersProps = ({ loading, userType, users, }) => {
    const navigation = useNavigation()
    const [userName, setUserName] = React.useState("")
    const [userEmail, setUserEmail] = React.useState("")


    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    }
    const admins = [
        { id: 1, name: 'Admin 1 ScrollView', email: 'admin1test@gmail.com' },
        { id: 2, name: 'Admin 2 ScrollView', email: 'admin2test@gmail.com' },
        { id: 3, name: 'Admin 3 ScrollView', email: 'admin3test@gmail.com' },
        { id: 4, name: 'Admin 4 ScrollView', email: 'admin4test@gmail.com' },
        { id: 5, name: 'Admin 5 ScrollView ', email: 'admin5test@gmail.com' },
        { id: 6, name: 'Admin 1 ScrollView', email: 'admin1test@gmail.com' },
        { id: 7, name: 'Admin 2 ScrollView', email: 'admin2test@gmail.com' },
        { id: 8, name: 'Admin 3 ScrollView', email: 'admin3test@gmail.com' },
        { id: 9, name: 'Admin 4 ScrollView', email: 'admin4test@gmail.com' },
        { id: 10, name: 'Admin 5 ScrollView ', email: 'admin5test@gmail.com' },
        { id: 11, name: 'Admin 1 ScrollView', email: 'admin1test@gmail.com' },
        { id: 12, name: 'Admin 2 ScrollView', email: 'admin2test@gmail.com' },
        { id: 13, name: 'Admin 3 ScrollView', email: 'admin3test@gmail.com' },
        { id: 14, name: 'Admin 4 ScrollView', email: 'admin4test@gmail.com' },
        { id: 15, name: 'Admin 5 ScrollView ', email: 'admin5test@gmail.com' },
    ]
    return (
        <View style={{ paddingHorizontal: 10 }}>
            {users && users.length > 0 ? (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {/* search bar: search the cargo by entering the cargo id in the input * */}
                    <View style={{ paddingLeft: 8, backgroundColor: "lightgrey", flexDirection: "row", alignItems: "center", borderRadius: 10, width: "100%", height: 50, }}>
                        <MaterialIcons name="search" size={25} color="#FF9900" />
                        <TextInput
                            style={{
                                color: "#FF9900",
                                fontSize: 16,
                                fontWeight: "bold",
                                borderRadius: 5,
                                padding: 10,
                                marginVertical: 10,
                                backgroundColor: "#F5F5F5",
                                width: "90%",
                                height: 35,
                                paddingVertical: 10,
                                paddingHorizontal: 10,

                            }}
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                            placeholder="Search by cargo id"
                        />
                    </View>

                    {/** search result */}
                    <View style={{ width: "100%", flexDirection: "column", marginBottom: 10 }}>
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                {/***
                                      if (userType === "admin") {
                                        return ()
                                    */}

                                if (item.name.toLowerCase().includes(userName.toLowerCase())) {
                                    if (userName === "") {
                                        return null;
                                    } else {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('ManageUsersRoles', {
                                                    userType: userType,
                                                    userData: item
                                                })}
                                                key={item.id}
                                                style={{
                                                    backgroundColor: "#FF9900",
                                                    paddingVertical: 4,
                                                    paddingHorizontal: 10,
                                                    marginVertical: 10,
                                                    borderRadius: 5,
                                                }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    {item.image && <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                                                    {!item.image && <Image source={require('../../../../assets/images/placeholder.jpg')} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#fff", fontSize: 16 }}>{item.name}</Text>
                                                        <Text style={{ color: "#fff", fontSize: 12 }}>{item.email}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )

                                    }

                                }
                            }
                            }
                        />



                    </View>

                </View>
            ) : (
                <View style={{justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No {userType} Users Found</Text>
                </View>


            )}
        </View>
    )
}

export default UsersProps

const styles = StyleSheet.create({})