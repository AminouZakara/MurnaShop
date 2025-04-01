import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ProductsCard from '../productCard/ProductsCard'


const ProductList = ({ productLists, productFor, category }) => {

  return (
    <View
      showsVerticalScrollIndicator={false}

      style={{
        paddingHorizontal: 4,
      }}>
      <FlatList
        data={productLists}
        numColumns={2}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductsCard
            product={item}
          />
        )}
      />
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
  },
  cartContainer: {
    marginTop: 2,
    flexDirection: "column",
    justifyContent: "center",
    padding: 0.5,
  },
  // set the image with and height the same as the container

  image: {
    width: "100%",
    height: 250,
    borderRadius: 4,
  },
  infoContainer: {
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  title: {
    fontSize: 10,
    color: 'grey',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',

  }


})