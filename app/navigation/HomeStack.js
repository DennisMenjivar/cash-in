import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../_screens/Home";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#F5F208",
          },
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
