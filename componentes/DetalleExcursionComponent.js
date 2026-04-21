import { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper';

import { colorGaztaroaClaro, colorGaztaroaOscuro, baseUrl } from '../comun/comun';


//import { EXCURSIONES } from '../comun/excursiones'
//import { COMENTARIOS } from '../comun/comentarios';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades, postFavorito } from '../redux/ActionCreators';

import { IndicadorActividad } from './IndicadorActividadComponent';




const mapStateToProps = (state) => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos,
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios()),
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
})




function RenderComentario(props) {
    const comentarios = props.comentarios;

    const renderComentario = (comentario) => {

        const fecha = new Date(comentario.dia.replace(/ /g, ''));

        const fechaFormateada =
            `${fecha.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}, ${fecha.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })}`;

        return (
            <View key={comentario.id} style={styles.comentario}>

                <Text>
                    {comentario.comentario}
                </Text>

                <Text style={styles.autor}>
                    {comentario.valoracion} estrellas
                </Text>

                <Text style={styles.autor}>
                    -- {comentario.autor}, {fechaFormateada}
                </Text>


                <Divider />

            </View>
        );
    };

    return (
        <Card style={styles.card}>
            <Card.Title
                title="Comentarios"
                titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
            />

            <Card.Content>
                {comentarios.map(renderComentario)}
            </Card.Content>
        </Card>
    );
}


function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {

        return (
            <Card style={styles.card}>

                <ImageBackground

                    source={{ uri: baseUrl + excursion.imagen }}
                    style={styles.image}
                >

                    <Text style={styles.tituloImagen}>
                        {excursion.nombre}
                    </Text>

                </ImageBackground>


                <Card.Content>
                    <Text style={styles.descripcion}>
                        {excursion.descripcion}
                    </Text>
                </Card.Content>

                <View style={styles.iconoContainer}>
                    <IconButton
                        icon={props.favorita ? 'heart' : 'heart-outline'}
                        size={28}
                        onPress={() =>
                            props.favorita
                                ? console.log('La excursión ya se encuentra entre las favoritas')
                                : props.onPress()
                        }
                    />
                </View>

            </Card>
        );
    }
    else {
        return <View />;
    }

}


class DetalleExcursion extends Component {

    /**
     * constructor(props) {
        super(props);
        this.state = {
            //excursiones: EXCURSIONES,
            //comentarios: COMENTARIOS,
            favoritos: [],
        };
    }
     */

    componentDidMount() {
        this.props.fetchExcursiones();
        this.props.fetchComentarios();
    }


    marcarFavorito(excursionId) {
        /*
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId)
        });
        */
        this.props.postFavorito(excursionId);
    }


    render() {
        const { excursionId } = this.props.route.params;

        const excursiones = this.props.excursiones.excursiones || [];
        const comentarios = this.props.comentarios.comentarios || [];

        const excursion = excursiones.find(e => e.id === +excursionId);


        if (this.props.excursiones.isLoading || this.props.comentarios.isLoading) {
            return <IndicadorActividad />;
        }

        if (this.props.excursiones.errMess) {
            return <Text>{this.props.excursiones.errMess}</Text>;
        }

        if (this.props.comentarios.errMess) {
            return <Text>{this.props.comentarios.errMess}</Text>;
        }
        return (
            <ScrollView>

                <RenderExcursion
                    excursion={excursion}
                    favorita={
                        (this.props.favoritos?.favoritos ?? []).some(el => el === +excursionId)
                    }
                    onPress={() => this.marcarFavorito(excursionId)}
                />

                <RenderComentario
                    comentarios={comentarios.filter(c => c.excursionId === +excursionId)}
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
        justifyContent: 'center',
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
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    comentario: {
        marginBottom: 15,
    },
    autor: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
    fecha: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
    iconoContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
});

//export default DetalleExcursion;
export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion); 