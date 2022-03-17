import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CashIn from "../_screens/CashIn/CashIn";
import Pay from "../_screens/Pay";

const Stack = createStackNavigator();

export default function CashInStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cashin"
        component={CashIn}
        options={{
          title: "Cash-in",
          headerStyle: {
            backgroundColor: "#F5F208",
          },
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="pay"
        component={Pay}
        options={({ route, navigation }) => ({
          title: "Pagar: " + route.params.amount,
          headerStyle: {
            backgroundColor: "#F5F208",
          },
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
          },
          headerBackTitleStyle: {
            color: "black",
          },
        })}
      />
    </Stack.Navigator>
  );
}
