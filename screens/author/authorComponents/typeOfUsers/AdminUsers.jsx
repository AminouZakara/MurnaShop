import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UsersProps from './UsersProps'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

const AdminUsers = () => {
    // This component is for displaying admin users
    // You can add your logic here to fetch and display admin users
    const [adminUsersLoading, setAdminUsersLoading] = useState(false)
    const [adminUsers, setAdminUsers] = useState([])

    const fetchAdminUsers = async () => {
        setAdminUsersLoading(true)
        try {
            const adminQuery = query(
                collection(db, "murnaShoppingUsers"),
                where("role", "==", "admin")
            );
            const adminSnapshot = await getDocs(adminQuery);
            const adminUsersList = adminSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setAdminUsers(adminUsersList);
        } catch (error) {
            console.error("Error fetching admin users: ", error);
        }
        finally {
            setAdminUsersLoading(false)
        }
    }
    useEffect(() => {
        fetchAdminUsers()
    }, [])

    console.log("Admin Users: ", adminUsers);


    return (
        <View>
            <UsersProps loading={adminUsersLoading} userType="admin" users={adminUsers} />
        </View>
    )
}

export default AdminUsers

const styles = StyleSheet.create({})