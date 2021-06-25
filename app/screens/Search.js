import React from 'react'
import {StyleSheet, View, Button, FlatList, Image, TouchableOpacity} from 'react-native'
import {ButtonGroup, Text} from "react-native-elements";
import {search} from "../lib/util";

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.options = {
            categories: ["", "Marvel", "DC"],
            categories_names: ["Tout", "Marvel", "DC"],
            tags: []
        }
        this.search = {}
        this.nextPage = 0
        this.state = {
            categorySelectedIndex: 0,
            articles: [],
            isLoading: false
        }
    }

    _updateCategorySearch = (selectedIndex) => {
        this.setState({categorySelectedIndex: selectedIndex}, () => {
            this.search.category__contains = this.options.categories[selectedIndex]
        })
    }

    _searchArticles() {
        search(this.search, 0).then((rep) => {
            let data = rep.data
            console.log(data)
            this.nextPage = data.page + 1
            this.setState({articles: [...this.state.articles, ...data.articles]})
        }).catch(err => {console.log(err)})
    }

    _loadMoreArticles() {

        search(this.search, this.nextPage).then((rep) => {
            let data = rep.data
            console.log(data)
            this.nextPage = data.page + 1
            this.setState({articles: [...this.state.articles, ...data.articles]})
        }).catch(err => {console.log(err)})
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View>
                    <View style={styles.input_container}>
                        <Text>Catégorie :</Text>
                        <ButtonGroup
                            buttons={this.options.categories_names}
                            selectedIndex={this.state.categorySelectedIndex}
                            onPress={this._updateCategorySearch}
                            containerStyle={{flex: 1}}
                        />
                    </View>
                </View>
                <Button title='Rechercher' onPress={() => this._searchArticles()}/>
                <FlatList
                    style={{width: "100%"}}
                    data={this.state.articles}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        this._loadMoreArticles()
                    }}
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
                                    <TouchableOpacity key={tag} onPress={() => {
                                    }}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        display: "flex",
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input_container: {
        flexDirection: "row",
        //justifyContent: "center"
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
})