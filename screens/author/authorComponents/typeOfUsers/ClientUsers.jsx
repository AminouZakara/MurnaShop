import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UsersProps from './UsersProps'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

const ClientUsers = () => {
    const [clientUsersLoading, setClientUsersLoading] = React.useState(false)
    const [clientUsers, setClientUsers] = React.useState([])
    const fetchClientUsers = async () => {
        setClientUsersLoading(true)
        try {
            const clientQuery = query(collection(db, "murnaShoppingUsers"), where("role", "==", "user"));
            const clientSnapshot = await getDocs(clientQuery);
            const clientUsersList = clientSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setClientUsers(clientUsersList);
        } catch (error) {
            console.error("Error fetching client users: ", error);
        } finally {
            setClientUsersLoading(false)
        }
    }
    React.useEffect(() => {
        fetchClientUsers()
    }, [])
    return (
        <View>
            {/* Render the list of client users here */}
            <UsersProps loading={clientUsersLoading} userType="Users" users={clientUsers} />
        </View>
    )
}

export default ClientUsers

const styles = StyleSheet.create({})