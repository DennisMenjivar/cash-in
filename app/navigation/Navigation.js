import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import HomeStack from "./HomeStack";
import CashInStack from "./CashInStack";
import WalletStack from "./WalletStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="cashin-stack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarInactiveTintColor: "#77703F",
          tabBarActiveTintColor: "#f3b530",
          tabBarStyle: { backgroundColor: "#06292f" },
          tabBarHideOnKeyboard: true,
          // tabBarItemStyle: {
          //   backgroundColor: "#00ff00",
          //   margin: 5,
          //   borderRadius: "100%",
          //   width: "50%",
          // },
        })}
      >
        <Tab.Screen
          name="home-stack"
          component={HomeStack}
          options={{
            title: "Home",
            headerShown: false,
            // backgroundColor: "white",
            // style: {
            //   paddingVertical: 10,
            //   backgroundColor: "#fff",
            //   border: "#ffffff",
            // },
          }}
        />
        <Tab.Screen
          name="cashin-stack"
          component={CashInStack}
          options={{
            title: "Cash-In",
            headerShown: false,
            // backgroundColor: "white",
            // style: {
            //   paddingVertical: 10,
            //   backgroundColor: "#fff",
            //   border: "#ffffff",
            // },
          }}
        />
        <Tab.Screen
          name="wallet-stack"
          component={WalletStack}
          options={{
            title: "Wallet",
            headerShown: false,
            // backgroundColor: "white",
            // style: {
            //   paddingVertical: 10,
            //   backgroundColor: "#fff",
            //   border: "#ffffff",
            // },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;
  let iconStyle;

  switch (route.name) {
    case "home-stack":
      iconName = "home";
      break;
    case "cashin-stack":
      iconName = "cash-100";
      // iconStyle = {
      //   backgroundColor: "red",
      //   padding: 15,
      //   alignItems: "center",
      //   borderRadius: 50,
      //   borderWidth: "2%",
      //   borderColor: "black",
      //   marginBottom: "50%",
      // };
      break;
    case "wallet-stack":
      iconName = "wallet-outline";
      break;
    default:
      break;
  }
  return (
    <Icon
      type="material-community"
      name={iconName}
      size={22}
      color={color}
      // iconStyle={iconStyle}
    ></Icon>
  );
}

// backgroundColor: "red",
//             position: "absolute",
//             bottom: "17%",
//             padding: "32px",
//             borderRadius: "32px",
