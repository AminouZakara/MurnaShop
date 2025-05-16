import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UsersProps from './UsersProps'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

const CargaisonUsers = () => {

    const [cargaisonUsersLoading, setCargaisonUsersLoading] = useState(false)
    const [cargaisonUsers, setCargaisonUsers] = useState([])
    const fetchCargaisonUsers = async () => {
        setCargaisonUsersLoading(true)
        try {
            const cargaisonQuery = query(collection(db, "murnaShoppingUsers"), where("role", "==", "cargaison"));
            const cargaisonSnapshot = await getDocs(cargaisonQuery);
           const cargaisonUsersList = cargaisonSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCargaisonUsers(cargaisonUsersList);
        } catch (error) {
            console.error("Error fetching cargaison users: ", error);
        }
        finally {
            setCargaisonUsersLoading(false)
        }
    }
    useEffect(() => {
        fetchCargaisonUsers()
    }, [])
    return (
        <View>
            <UsersProps userType="Cargaison" users={cargaisonUsers} loading={cargaisonUsersLoading} />
        </View>
    )
}

export default CargaisonUsers

const styles = StyleSheet.create({})