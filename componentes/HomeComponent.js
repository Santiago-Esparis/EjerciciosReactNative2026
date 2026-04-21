import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { colorGaztaroaClaro, colorGaztaroaOscuro, baseUrl } from '../comun/comun';
import { IndicadorActividad } from './IndicadorActividadComponent';


//import { EXCURSIONES } from '../comun/excursiones';
//import { CABECERAS } from '../comun/cabeceras';
//import { ACTIVIDADES } from '../comun/actividades';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';






const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
})


/*
function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>

      <ImageBackground

        source={{ uri: baseUrl + item.imagen }}
        style={styles.image}
      >

        <Text style={styles.tituloImagen}>
          {item.nombre}
        </Text>

      </ImageBackground>

      <Card.Content>
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>
      </Card.Content>
    </Card>

  );
}

*/


function RenderItem(props) {
  const item = props.item;
  if (props.isLoading) {
    return (
      <IndicadorActividad />
    );
  }
  else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  else {
    const item = props.item;
    if (item != null) {
      return (
        <Card style={styles.card}>

          <ImageBackground

            source={{ uri: baseUrl + item.imagen }}
            style={styles.image}
          >

            <Text style={styles.tituloImagen}>
              {item.nombre}
            </Text>

          </ImageBackground>

          <Card.Content>
            <Text style={styles.descripcion}>
              {item.descripcion}
            </Text>
          </Card.Content>
        </Card>
      );
    }
    else {
      return (<View></View>);
    }
  }
}



class Home extends Component {

  /**
 
    constructor(props) {
      super(props);
      this.state = {
        excursiones: EXCURSIONES,
        cabeceras: CABECERAS,
        actividades: ACTIVIDADES,
      };
    }
   */

  componentDidMount() {
    this.props.fetchExcursiones();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
    /*
    <RenderItem item={this.state.cabeceras.filter((item) => item.destacado)[0]} />
    <RenderItem item={this.state.excursiones.filter((item) => item.destacado)[0]} />
    <RenderItem item={this.state.actividades.filter((item) => item.destacado)[0]} />
    --
    <RenderItem item={this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]} />
    <RenderItem item={this.props.excursiones.excursiones.filter((item) => item.destacado)[0]} />
    <RenderItem item={this.props.actividades.actividades.filter((item) => item.destacado)[0]} />
    */

    return (
      <ScrollView>

        <RenderItem item={this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]}
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />

        <RenderItem item={this.props.excursiones.excursiones.filter((item) => item.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />

        <RenderItem item={this.props.actividades.actividades.filter((item) => item.destacado)[0]}
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />



      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    height: 200,
    marginHorizontal: 0,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    textAlign: 'center',
  },
  cardTitle: {
    alignItems: 'center',
  },
  tituloImagen: {
    color: 'chocolate',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

//export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home); 