import React from "react";
import {StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity} from "react-native";
import {getLastArticles} from "../lib/util";

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
        this.nextPage = 0
    }

    componentDidMount() {
        this._loadMoreArticles()
    }
    _loadMoreArticles = () => {
        getLastArticles(this.nextPage).then((rep) => {
            let data = rep.data
            console.log(data)
            this.nextPage = data.page + 1
            this.setState({articles: [...this.state.articles, ...data.articles]})
        }).catch(err => {console.log(err)})
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.articles.length === 0 ? (
                    <View style={styles.noPosts}>
                        <Text style={styles.noPostsText}>
                            You have no articles for the moment!
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        style={{width: "100%"}}
                        data={this.state.articles}
                        keyExtractor={item => item.id.toString()}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {this._loadMoreArticles()}}
                        renderItem={({item}) => (
                            <View style={styles.post}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: item.image
                                    }}
                                />
                                <Text style={styles.title}>{item.titre}</Text>
                                <View style={styles.tags}>
                                    {item.tags.map((tag) => (
                                        <TouchableOpacity key={tag} onPress={() => {}}>
                                            <Text style={styles.tag}>#{tag}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        color="#9f79ee"
                                        title="Lire l'article"
                                        onPress={() =>
                                            this.props.navigation.navigate("Article", {id: item.id})
                                        }
                                    />
                                </View>
                            </View>
                        )}
                    />
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
    noPosts: {
        flex: 1,
        width: 190,
        alignItems: "center",
        justifyContent: "center"
    },
    noPostsText: {
        fontWeight: "bold",
        fontSize: 23,
        textAlign: "center"
    },
    post: {
        marginTop: 20,
        shadowOffset: {width: 10, height: 10},
        shadowColor: "black",
        shadowOpacity: 1,
        elevation: 7,
        borderWidth: 1,
        borderColor: "#0000",
        backgroundColor: "#0000",
        width: "80%",
        maxWidth: 325,
        alignSelf: "center",
        marginBottom: 30
    },
    image: {
        alignSelf: "center",
        height: 180,
        width: "95%",
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
    button: {
        marginTop: 15,
        marginBottom: 10,
        width: 130,
        alignSelf: "center"
    }
});

export default Show;
