import { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList, Modal } from 'react-native';
import { Card, Text, Divider, IconButton, TextInput, Button } from 'react-native-paper';

import { colorGaztaroaClaro, colorGaztaroaOscuro, baseUrl } from '../comun/comun';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//import { EXCURSIONES } from '../comun/excursiones'
//import { COMENTARIOS } from '../comun/comentarios';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades, postFavorito, postComentario } from '../redux/ActionCreators';

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
    postComentario: (excursionId, valoracion, autor, comentario) =>
        dispatch(postComentario(excursionId, valoracion, autor, comentario)),
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

                    <IconButton
                        icon="pencil"
                        size={28}
                        onPress={
                            props.onPressComentario
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
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        }
    }

    componentDidMount() {
        this.props.fetchExcursiones();
        this.props.fetchComentarios();
    }


    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    toggleModal() {
        const nuevoEstado = !this.state.showModal;

        this.setState({ showModal: nuevoEstado });

        if (this.state.showModal) {
            this.resetForm();
        }
    }

    handleSubmit() {
        const { excursionId } = this.props.route.params;

        this.props.postComentario(
            +excursionId,
            this.state.valoracion,
            this.state.autor,
            this.state.comentario
        );

        this.toggleModal();
        this.resetForm();
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            showModal: false
        });
    }

    renderEstrellas() {
        return [1, 2, 3, 4, 5].map((num) => (
            <MaterialCommunityIcons
                key={num}
                name={this.state.valoracion >= num ? 'star' : 'star-outline'}
                size={40}
                color="#f4b400"
                onPress={() => this.setState({ valoracion: num })}
            />
        ));
    }

    getTextoValoracion() {
        switch (this.state.valoracion) {
            case 1: return 'Muy malo';
            case 2: return 'Malo';
            case 3: return 'Normal';
            case 4: return 'Bueno';
            case 5: return 'Excelente';
            default: return '';
        }
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
                    onPressComentario={() => this.toggleModal()}
                />

                <RenderComentario
                    comentarios={comentarios.filter(c => c.excursionId === +excursionId)}
                />

                <Modal
                    visible={this.state.showModal}
                    animationType="slide"
                    transparent={false}
                >
                    <View style={styles.modalContainer}>

                        <Text style={styles.modalTitulo}>Añadir comentario</Text>

                        <View style={styles.estrellasContainer}>
                            {this.renderEstrellas()}
                        </View>

                        <Text style={styles.textoValoracion}>
                            {this.getTextoValoracion()}
                        </Text>

                        <TextInput
                            label="Autor"
                            mode="outlined"
                            outlineColor={colorGaztaroaOscuro}
                            activeOutlineColor={colorGaztaroaOscuro}
                            left={<TextInput.Icon icon="account" />}
                            value={this.state.autor}
                            onChangeText={(text) => this.setState({ autor: text })}
                            style={{ marginBottom: 15 }}
                        />

                        <TextInput
                            label="Comentario"
                            mode="outlined"
                            outlineColor={colorGaztaroaOscuro}
                            activeOutlineColor={colorGaztaroaOscuro}
                            left={<TextInput.Icon icon="comment" />}
                            multiline
                            value={this.state.comentario}
                            onChangeText={(text) => this.setState({ comentario: text })}
                            style={{ marginBottom: 20 }}
                        />

                        <View style={styles.botonesContainer}>

                            <Button
                                mode="outlined"
                                textColor={colorGaztaroaOscuro}
                                onPress={() => {
                                    this.resetForm();
                                    this.toggleModal();
                                }}
                            >
                                X  Cancelar
                            </Button>

                            <Button
                                mode="contained"
                                buttonColor={colorGaztaroaOscuro}
                                onPress={() => this.handleSubmit()}
                            >
                                → Enviar
                            </Button>

                        </View>

                    </View>
                </Modal>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'flex-start'
    },
    modalTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    estrellasContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    textoValoracion: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
});

//export default DetalleExcursion;
export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion); 