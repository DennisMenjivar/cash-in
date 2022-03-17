import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Pay from "../_screens/Pay";
import { Button } from "react-native-elements";

const Stack = createStackNavigator();

export default function PayStack(props) {
  const { amount } = props;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="pay"
        component={Pay}
        options={{
          title: `Enviar ${amount}`,
          headerStyle: {
            backgroundColor: "#F5F208",
          },
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
          },
        }}
      />
      <Button>Detail</Button>
    </Stack.Navigator>
  );
}
