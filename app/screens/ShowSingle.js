import React from "react";
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    Button
} from "react-native";

const ShowSingle = ({route, navigation}) => {

    return (
        <View style={styles.container}>
            {typeof post != "undefined" ? (
                <ScrollView style={styles.scroll}>
                    <View style={styles.post}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: post.image
                            }}
                        />
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.description}>{post.description}</Text>
                    </View>
                </ScrollView>
            ) : (
                <Text></Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    post: {
        marginTop: 20,
        width: "80%",
        maxWidth: 355,
        alignSelf: "center"
    },
    image: {
        alignSelf: "center",
        height: 180,
        width: "100%",
        paddingHorizontal: 10,
        marginTop: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        paddingHorizontal: 10,
        paddingTop: 5,
        alignSelf: "center"
    },
    description: {
        textAlign: "center",
        paddingHorizontal: 10,
        paddingTop: 15
    },
    singleButton: {
        width: 70
    },
    scroll: {
        width: "100%"
    }
});

export default ShowSingle;
