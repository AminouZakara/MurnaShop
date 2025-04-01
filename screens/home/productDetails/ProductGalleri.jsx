import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';


const { width, height } = Dimensions.get("window"); // Get screen width and height

const ProductGalleri = ({ images }) => {

      {/** Photos galleri. map all the images of the product then display and when a photo is clicked , it will be displayed in full screen and the other photos will be displayed in a carousel view. Then add a closed button to close the full screen image view. */ }


  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openImage = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

    return (
        <View>
            {/* Display Thumbnails */}
            <View style={styles.thumbnailContainer}>
                {images.map((img, index) => (
                    <TouchableOpacity key={index} onPress={() => openImage(index)}>
                        <Image source={{ uri: img }} style={styles.thumbnail} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Full-Screen Image Viewer */}
            <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Image source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/delete-sign.png" }} style={styles.closeIcon} />
                    </TouchableOpacity>

                    <Carousel
                        loop
                        width={width}
                        height={height * 0.8}
                        data={images}
                        scrollAnimationDuration={500}
                        defaultIndex={selectedImageIndex}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.fullScreenImage} />
                        )}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default ProductGalleri

const styles = StyleSheet.create({
    // Galleri
    thumbnailContainer: { flexDirection: "row", flexWrap: "wrap", },
    thumbnail: { width: 80, height: 80, marginVertical: 4, marginHorizontal: 8, borderRadius: 5 },
    modalContainer: { flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" },
    fullScreenImage: { width: width, height: height * 0.8, resizeMode: "contain" },
    closeButton: { position: "absolute", top: 40, right: 20, zIndex: 10 },
    closeIcon: { width: 30, height: 30, tintColor: "white" },
})