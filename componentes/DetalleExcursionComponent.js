import { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones'
import { COMENTARIOS } from '../comun/comentarios';


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

                
                <Divider/>

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
                    source={require('./imagenes/40Años.png')}
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

    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: [],
        };
    }

    marcarFavorito(excursionId) {
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId)
        });
    }


    render() {
        const { excursionId } = this.props.route.params;

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
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
        color: 'chocolate',
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

export default DetalleExcursion;