import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  ListItem,
  Avatar,
  Card,
  Icon,
  Button,
  Slider,
} from "react-native-elements";
import ContactsComponent from "./CashIn/ContactsComponent";
import PaymentMethodsComponent from "./CashIn/PaymentMethodsComponent";

export default function Pay(props) {
  const { username, amount } = props.route.params;
  const navigation = useNavigation();

  let [contact, setContact] = useState();
  let [paymentMethod, setPaymentMethod] = useState();
  let [contactsActive, setContactsActive] = useState(false);
  let [paymentMethodActive, setPaymentMethodActive] = useState(false);
  let [value, setValue] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          buttonStyle={{ backgroundColor: "transparent" }}
          titleStyle={{ color: "black" }}
          onPress={() => setContactsActive(false)}
          title={contactsActive ? "Cancelar" : ""}
          iconPosition="right"
          icon={
            contactsActive && (
              <Icon
                type="material-community"
                name="close"
                iconStyle={{ color: "red" }}
              />
            )
          }
        />
      ),
    });
  }, [navigation, contactsActive]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          buttonStyle={{ backgroundColor: "transparent" }}
          titleStyle={{ color: "black" }}
          onPress={() => setPaymentMethodActive(false)}
          title={paymentMethodActive ? "Cancelar" : ""}
          iconPosition="right"
          icon={
            paymentMethodActive && (
              <Icon
                type="material-community"
                name="close"
                iconStyle={{ color: "red" }}
              />
            )
          }
        />
      ),
    });
  }, [navigation, paymentMethodActive]);

  const setContactToPay = (con) => {
    setContactsActive(false);
    setContact(con);
  };

  const setPaymentMethodToPay = (pay) => {
    setPaymentMethodActive(false);
    setPaymentMethod(pay);
  };

  function ContactSelected() {
    return (
      <TouchableOpacity onPress={() => setContactsActive(true)}>
        <Text style={styles.section}>Destinatario:</Text>
        <ListItem
          key={contact.key}
          containerStyle={{ backgroundColor: "#06292f" }}
        >
          <Avatar
            rounded
            size="medium"
            containerStyle={styles.userInfoAvatar}
            source={require("../../assets/img/avatar-default.jpg")}
          ></Avatar>
          <View
            key={"detail" + contact.key}
            style={{ justifyContent: "center" }}
          >
            <Text key={"text" + contact.key} style={styles.displayName}>
              {contact.name}
            </Text>
            <Text style={styles.displaySubTitle}>
              {contact.telephoneNumber}
            </Text>
          </View>
        </ListItem>
      </TouchableOpacity>
    );
  }

  function PaymentMethodSelected() {
    return (
      <TouchableOpacity onPress={() => setPaymentMethodActive(true)}>
        <Text style={styles.section}>Cuenta:</Text>
        <ListItem containerStyle={{ backgroundColor: "#06292f" }}>
          <Icon
            type="material-community"
            name="currency-usd"
            containerStyle={styles.iconPaymentMethod}
            size={30}
            iconStyle={{
              color: "#b0b1b5",
            }}
          />
          {paymentMethod ? (
            <View
              key={"detail" + paymentMethod.id}
              style={{ justifyContent: "center" }}
            >
              <Text key={"text" + paymentMethod.id} style={styles.displayName}>
                {paymentMethod.name}
              </Text>
              <Text style={styles.displaySubTitle}>{paymentMethod.id}</Text>
            </View>
          ) : (
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.displayName}>Seleccionar Metodo de Pago</Text>
            </View>
          )}
        </ListItem>
      </TouchableOpacity>
    );
  }

  const completedSlider = (value) => {
    if (value == 100) {
      alert("Completed");
    }
    setValue(parseInt(value));
  };

  function ButtonOptions() {
    return (
      <View
        containerStyle={{
          backgroundColor: "#06292f",
          justifyContent: "center",
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
        }}
        style={{ marginBottom: 50 }}
      >
        <Text
          style={{ textAlign: "center", paddingBottom: 10, color: "white" }}
        >
          Estoy {value}% seguro.
        </Text>
        <Slider
          style={{ width: "70%", marginLeft: "15%" }}
          value={value}
          maximumValue={100}
          minimumValue={0}
          step={5}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="chevron-right"
                type="material-community"
                size={25}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                iconStyle={{ color: "white" }}
                color="red"
              />
            ),
          }}
          onSlidingComplete={(valor) => completedSlider(valor)}
        />
        <Text style={{ textAlign: "center", paddingTop: 15, color: "white" }}>
          Deslice completamente para poder pagar.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#06292f",
      }}
    >
      <ScrollView style={styles.container}>
        {contact && <ContactSelected />}
        {contact && <Card.Divider />}
        {contact && <PaymentMethodSelected />}
        {contact && <Card.Divider />}
      </ScrollView>
      {paymentMethodActive ||
        contactsActive ||
        (contact && paymentMethod && <ButtonOptions />)}
      {(!contact || contactsActive) && (
        <ContactsComponent setContactToPay={setContactToPay} />
      )}
      {((contact && !paymentMethod) || paymentMethodActive) && (
        <PaymentMethodsComponent
          setPaymentMethodToPay={setPaymentMethodToPay}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    margin: 5,
    padding: 7,
    position: "absolute",
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,
  },
  viewUserInfo: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    paddingTop: 5,
  },
  userInfoAvatar: {
    marginRight: 0,
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor: "#f3b530",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
    color: "#f3b530",
  },
  displaySubTitle: {
    paddingBottom: 5,
    color: "gray",
  },
  section: {
    textAlign: "left",
    padding: 7,
    backgroundColor: "#06292f",
    position: "relative",
    top: 0,
    left: 0,
    fontWeight: "bold",
    color: "#f3b530",
    paddingLeft: 15,
    paddingBottom: 0,
  },
  iconPaymentMethod: {
    backgroundColor: "#e1e2e4", //Gris claro
    borderRadius: 100,
    padding: 7,
    borderWidth: 2,
    borderColor: "#f3b530",
  },
});
