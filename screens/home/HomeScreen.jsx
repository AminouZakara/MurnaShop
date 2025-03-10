import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/home/header/Header';
import AllProducts from '../../components/home/categories/allProducts/AllProducts';
import FemmeProducts from '../../components/home/categories/femmeProducts/FemmeProducts';
import BeautyProducts from '../../components/home/categories/beautyProducts/BeautyProducts';
import HommeProducts from '../../components/home/categories/hommeProducts/HommeProducts';
import JewelryProducts from '../../components/home/categories/jewelryProducts/JewelryProducts';
import SportsProducts from '../../components/home/categories/sportsProducts/SportsProducts';
import KidsProducts from '../../components/home/categories/kidsProducts/KidsProducts';
import BabyProducts from '../../components/home/categories/babyProducts/BabyProducts';
import ElectronicsProducts from '../../components/home/categories/electronicsProducts/ElectronicsProducts';
import StationaryProducts from '../../components/home/categories/stationaryProducts/StationaryProducts';
import AccessoiresProducts from '../../components/home/categories/accessoiresProducts/AccessoiresProducts';
import ChaussuresProducts from '../../components/home/categories/chaussuresProducts/ChaussuresProducts';
import SacsProducts from '../../components/home/categories/sacsProducts/SacsProducts';
import VetementsProducts from '../../components/home/categories/vetementsProducts/VetementsProducts';
import FillesProducts from '../../components/home/categories/fillesProducts/FillesProducts';
import GarconsProducts from '../../components/home/categories/garconsProducts/GarconsProducts';
import MaisonProducts from '../../components/home/categories/maisonProducts/MaisonProducts';

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerStyle: {
        backgroundColor: "#FF9900",
        borderBottomColor: "transparent",
        shadowColor: "transparent"
      },
    });
  }, [navigation]);

  const categories = [
    { id: 1, name: "Tout" },
    { id: 2, name: 'Femme' },
    { id: 3, name: 'Homme' },
    { id: 4, name: 'Vêtements' },
    { id: 5, name: 'Beauté' },
    { id: 6, name: 'Bijoux' },
    { id: 7, name: 'Accsessoires' },
    // { id: 8, name: 'Sports' },
    { id: 9, name: 'Chaussures' },
    { id: 10, name: 'Sacs' },
    { id: 11, name: 'Enfant' },
    { id: 12, name: 'Filles' },
    { id: 13, name: 'Garçons' },
    { id: 14, name: 'Bébé' },
    { id: 15, name: 'Électronique' },
    { id: 16, name: 'Maison' },
    { id: 17, name: 'Stationnaire' },

  ]
  const [selectedCategory, setSelectedCategory] = useState('Tout');

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            flexDirection: 'row',
            marginTop: 8,
            elevation: 5,
            backgroundColor: '#fff',
            paddingVertical: 8,
          }}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={{
                paddingRight: 10,
                paddingVertical: 4,
                paddingHorizontal: 8,
                marginHorizontal: 8,
                borderRadius: 8,
                borderWidth: 0.8,
                borderColor: '#ccc',
                //if the item is selected, change the color
                backgroundColor: selectedCategory === category.name ? 'orange' : '#fff',
              }}
              onPress={() => { setSelectedCategory(category.name) }}
            >

              <Text style={{ color: selectedCategory === category.name ? '#fff' : '#000' }}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/** Show the categories of products */}
        <View style={{
          paddingVertical: 4,
          paddingHorizontal: 8,
          elevation: 0.5,
          backgroundColor: '#fff',

        }}>
          <Text style={{ color: "green" }}>Shorts advs from home screen</Text>

        </View>
        <View>
          {selectedCategory === "Tout" && <AllProducts category={"Tous les produits"} />}
          {selectedCategory === "Femme" && <FemmeProducts category="Femme" />}
          {selectedCategory === "Beauté" && <BeautyProducts category="Beauté" />}
          {selectedCategory === "Homme" && <HommeProducts category="Homme" />}
          {selectedCategory === "Vêtements" && <VetementsProducts category="Vêtements" />}
          {selectedCategory === "Bijoux" && <JewelryProducts category="Bijoux" />}
          {selectedCategory === "Sports" && <SportsProducts category="Sports" />}
          {selectedCategory === "Enfant" && <KidsProducts category="Enfant" />}
          {selectedCategory === "Filles" && <FillesProducts category="Filles" />}
          {selectedCategory === "Garçons" && <GarconsProducts category="Garçons" />}
          {selectedCategory === "Bébé" && <BabyProducts category="Bébé" />}
          {selectedCategory === "Électronique" && <ElectronicsProducts category="Électronique" />}
          {selectedCategory === "Maison" && <MaisonProducts category="Maison" />}
          {selectedCategory === "Stationnaire" && <StationaryProducts category="Stationnaire" />}
          {selectedCategory === "Accsessoires" && <AccessoiresProducts category="Accsessoires" />}
          {selectedCategory === "Chaussures" && <ChaussuresProducts category="Chaussures" />}
          {selectedCategory === "Sacs" && <SacsProducts category="Sacs" />}
        </View>

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})