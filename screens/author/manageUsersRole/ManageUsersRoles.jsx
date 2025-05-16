import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const ManageUsersRoles = () => {
    // This component is for managing user roles
    const route = useRoute()
    const userData = route.params?.userData;
    console.log("User data from route params:", userData);
    
    
   {/**
    
    const [userRole, setUserRole] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [userId, setUserId] = React.useState(null)

     const fetchUserData = async () => {
        try {
            setLoading(true)
           
            const userRef = doc(db, "murnaShoppingUsers", userId);
            const userSnap = await getDoc(userRef);
           if (userSnap.exists()) {
            setUserData({
                 ...userSnap.data(),
                 id: userSnap.id,
               });
               setLoading(false);
            } else {
                setError(`No user found with this ID: ${userId}`);
               setLoading(false);
               console.log("No user found with this ID");
               setUserId("");
            }
        }
        catch (error) {
            setError(error.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        fetchUserData()
    }, [userId])
    */}
  return (
    <View>
      <Text>ManageUsersRoles</Text>
    </View>
  )
}

export default ManageUsersRoles

const styles = StyleSheet.create({})