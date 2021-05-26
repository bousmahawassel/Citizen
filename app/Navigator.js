import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Show from "./screens/Show";
import ShowSingle from "./screens/ShowSingle";

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <>
                    <Stack.Screen name="Show" component={Show}/>
                    <Stack.Screen name="ShowSingle" component={ShowSingle}/>
                </>
            </Stack.Navigator>
        </NavigationContainer>
    );
}