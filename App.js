import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Campobase from './componentes/CampobaseComponent';



export default function App() {
  return (


    <SafeAreaProvider>
      <PaperProvider>

        <View style={{ flex: 1 }}>
          <Campobase />
          <StatusBar style="auto" />
        </View>

      </PaperProvider>
    </SafeAreaProvider>

  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
