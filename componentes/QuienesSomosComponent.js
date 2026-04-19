import React, { Component } from 'react';
import { Card, List, Divider } from 'react-native-paper';
import { FlatList, Text, StyleSheet, Image, View, ScrollView } from 'react-native';

import { colorGaztaroaClaro, colorGaztaroaOscuro, baseUrl } from '../comun/comun';


//import { ACTIVIDADES } from '../comun/actividades';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';



const mapStateToProps = (state) => {
  return {
    actividades: state.actividades
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchActividades: () => dispatch(fetchActividades()),
})



function Historia() {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Un poquito de historia"
        titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
      />
      <Card.Content>
        <Text style={styles.texto}>
          El nacimiento del club de montaña Gaztaroa se remonta a la
          primavera de 1976 cuando jóvenes aficionados a la montaña y
          pertenecientes a un club juvenil decidieron crear la sección
          montañera de dicho club. Fueron unos comienzos duros debido sobre
          todo a la situación política de entonces. Gracias al esfuerzo
          económico de sus socios y socias se logró alquilar una bajera.
          Gaztaroa ya tenía su sede social.{'\n\n'}
          Desde aquí queremos hacer llegar nuestro agradecimiento a todos
          los montañeros y montañeras que alguna vez habéis pasado por el
          club aportando vuestro granito de arena.{'\n\n'}
          Gracias!
        </Text>
      </Card.Content>
    </Card>
  );
}

class QuienesSomos extends Component {

  /*
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES,
    };
  } 
  */

  componentDidMount() {
    this.props.fetchActividades();
  }



  render() {
    const renderActividadItem = ({ item }) => {
      return (
        <View>
          <List.Item
            title={item.nombre}
            description={item.descripcion}
            titleNumberOfLines={0}
            descriptionNumberOfLines={6}
            left={(props) => (
              <Image
                source={{ uri: baseUrl + item.imagen }}
                style={[props.style, styles.imagen]}
                resizeMode="cover"
              />
            )}
          />
          <Divider />
        </View>
      );
    };

    return (
      <ScrollView>
        <Historia />
        <Card style={styles.card}>
          <Card.Title
            title="Actividades y recursos"
            titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
          />
          <FlatList
            scrollEnabled={false}
            data={this.props.actividades.actividades}
            //data={this.state.actividades}
            //{this.props.actividades.actividades.map((item) => (}
            renderItem={renderActividadItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: { margin: 10 },
  texto: { lineHeight: 20, fontSize: 15 },
  imagen: { width: 40, height: 40, alignSelf: 'center' },
});

//export default QuienesSomos;
export default connect(mapStateToProps, mapDispatchToProps)(QuienesSomos);