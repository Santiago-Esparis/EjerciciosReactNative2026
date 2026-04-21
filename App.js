import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Campobase from './componentes/CampobaseComponent';


import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';

const store = ConfigureStore();


export default function App() {
  return (

    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <View style={{ flex: 1 }}>
            <Campobase />
            <StatusBar style="auto" />
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>

  );
}

