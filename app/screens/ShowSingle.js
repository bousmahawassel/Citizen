import React from "react";
import {StyleSheet, ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import {getArticle} from "../lib/util";

class ShowSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: undefined,
            loading: true
        }
    }
    componentDidMount() {
        getArticle(1).then((res) => {
            this.setState({post: res.data})
        })
    }

    render() {
        let {post, loading} = this.state
        post !== undefined && post.tags.push("test_tag", "arrowverse", "the_cw", "dc_comics", "warner")
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
                            <Text style={styles.title}>{post.titre}</Text>
                            <Text style={styles.description}>{post.contenu}</Text>
                            <View style={styles.tags}>
                                {post.tags.map(tag => (
                                    <TouchableOpacity key={tag} onPress={() => {}}>
                                        <Text style={styles.tag}>#{tag}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <Text></Text>
                )}
            </View>
        );
    }
}

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
    },
    tags: {
        textAlign: "center",
        paddingHorizontal: 10,
        paddingTop: 5,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    tag: {
        color: "blue",
        textDecorationLine: "underline",
        paddingHorizontal: 5,
    }
});

export default ShowSingle;
