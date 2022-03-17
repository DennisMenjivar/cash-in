import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Wallet from "../_screens/Wallet";

const Stack = createStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="wallet"
        component={Wallet}
        options={{
          title: "Wallet",
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
