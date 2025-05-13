import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';

const LoadingModal = ({ visible, text = "Traitement en cours...", showRetry, onRetry }) => (
  <Modal
    isVisible={visible || showRetry}
    backdropOpacity={0.6}
    useNativeDriver
    onBackdropPress={() => {}}
    onBackButtonPress={() => {}}
  >
    <View style={styles.modalContent}>
      {showRetry ? (
        <>
          <Text style={styles.text}>Échec du traitement</Text>
          <Button title="Réessayer" onPress={onRetry} />
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.text}>{text}</Text>
        </>
      )}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingModal;