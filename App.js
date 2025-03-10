import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import MyState from './context/data/myState';
export default function App() {
  return (
    <>
    <MyState>

      <StatusBar style="dark" />
      <StackNavigator />
    </MyState>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
