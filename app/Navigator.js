import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Show from "./screens/Show";
import ShowSingle from "./screens/ShowSingle";
import Search from "./screens/Search";

const Stack = createStackNavigator();
const SearchNavigator = createStackNavigator();
const Tabs = createBottomTabNavigator();
function LastArticlesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Derniers articles" component={Show}/>
            <Stack.Screen name="Article" component={ShowSingle}/>
        </Stack.Navigator>
    )
}

function SearchStack() {
    return (
        <SearchNavigator.Navigator>
            <SearchNavigator.Screen name="Recherche" component={Search} />
            <SearchNavigator.Screen name="Article" component={ShowSingle} />
        </SearchNavigator.Navigator>
    )
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <Tabs.Navigator>
                <Tabs.Screen name={"Derniers articles"} component={LastArticlesStack}/>
                <Tabs.Screen name="Recherche" component={SearchStack} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}