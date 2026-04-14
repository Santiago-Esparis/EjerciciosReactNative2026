import { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { List, Card, Divider } from 'react-native-paper';
import { StyleSheet, Text, ScrollView } from 'react-native';



function RenderContacto() {


    return (

        <Card style={styles.card}>
            <Card.Title
                title="Información de Contacto"
                titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
            />

            <Divider />

            <Card.Content>
                <Text style={styles.texto}>
                    Kaixo Mendizale!{'\n\n'}
                    Si quieres participar en las salidas de montaña que organizamos o
                    quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a
                    través de diferentes medios. Puedes llamarnos por teléfono los jueves
                    de las semanas que hay salida (de 20:00 a 21:00). También puedes
                    ponerte en contacto con nosotros escribiendo un correo electrónico, o
                    utilizando la aplicación de esta página web. Y además puedes
                    seguirnos en Facebook.{'\n\n'}
                    Para lo que quieras, estamos a tu disposición!{'\n\n'}
                    Tel: +34 948 277151{'\n\n'}
                    Email: gaztaroa@gaztaroa.com
                </Text>
            </Card.Content>
        </Card>

    );


}

class Contacto extends Component {


    render() {
        return (
            <ScrollView>

                <RenderContacto />

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({

    card: {
        margin: 8,
    },
    image: {
        marginHorizontal: 0,
    },
    descripcion: {
        marginTop: 20,
        marginBottom: 20,
    },

});

export default Contacto;