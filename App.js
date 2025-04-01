import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import MyState from './context/data/myState';
import { Provider } from 'react-redux';
import { store } from './redux/store';
export default function App() {
  return (
    <>
      <Provider store={store}>
        <MyState>
          <StatusBar style="dark" />
          <StackNavigator />
        </MyState>
      </Provider>
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
