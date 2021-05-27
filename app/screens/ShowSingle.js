import React from "react";
import {StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
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
        getArticle(this.props.route.params.id).then((res) => {
            this.setState({post: res.data, loading: false})
        })
    }

    render() {
        let {post, loading} = this.state
        return (
            <View style={styles.container}>
                {loading === true ? (
                    <View style={styles.loading_container}>
                        <ActivityIndicator color="green" size={100}/>
                    </View>
                    ) : post !== undefined ? (
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
    },
    loading_container: {
        flex:1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});

export default ShowSingle;
