import React, { useState, useEffect } from "react";
import { database, auth } from "../../firebase/firebase";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  doc,
  getDocs,
  getDoc,
  docs,
  limit,
} from "firebase/firestore";

import {
  Avatar,
  SearchBar,
  ListItem,
  Icon,
  Input,
} from "react-native-elements";

export default function PaymentMethodsComponent(props) {
  const { setPaymentMethodToPay } = props;

  let [payments, setPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [startPayments, setStartPayments] = useState(null);

  useEffect(async () => {
    const collectionRef = collection(
      database,
      "contacts",
      "kvngarcia",
      "paymentMethods"
    );
    const q = query(collectionRef, orderBy("name", "asc"), limit(15));
    const querySnapshot = await getDocs(q).then((result) => {
      setTotalPayments(result.size);
      setStartPayments(result.docs[result.docs.length - 1]);

      const resultData = [];

      result.forEach((con) => {
        const pContact = con.data();
        pContact.id = con.id;

        resultData.push(pContact);
      });
      setPayments(resultData);
    });
  }, []);

  function PaymentsFn(par) {
    const { params } = par;
    const { id, name } = params.item;

    return (
      <TouchableOpacity onPress={() => setPaymentMethodToPay(params.item)}>
        <ListItem key={id} containerStyle={styles.listItem}>
          <Avatar
            rounded
            size="medium"
            containerStyle={styles.userInfoAvatar}
            source={require("../../../assets/img/avatar-default.jpg")}
          ></Avatar>
          <View key={"detail" + id} style={{ justifyContent: "center" }}>
            <Text key={"text" + id} style={styles.displayName}>
              {name}
            </Text>
            <Text style={styles.displaySubTitle}>{id}</Text>
          </View>
        </ListItem>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={{ padding: 12 }}>
        <Text style={styles.inputSearch}>SELECCIONAR CUENTA</Text>
      </View>
      <View
        key={"paymentsView"}
        style={styles.SubViewContainer}
        onTouchStart={Keyboard.dismiss}
      >
        {payments.length > 0 ? (
          <FlatList
            data={payments}
            renderItem={(param) => <PaymentsFn params={param} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.loaderContacts}>
            <ActivityIndicator size={"large"} />
            <Text style={{ color: "#f3b530" }} key={"nohay"}>
              Cargando...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  SubViewContainer: {
    width: "100%",
    height: "90%",
    paddingBottom: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  viewUserInfo: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    paddingTop: 5,
  },
  userInfoAvatar: {
    marginRight: 0,
    backgroundColor: "#06292f",
    borderWidth: 2,
    borderColor: "#f3b530",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
    color: "#f3b530",
  },
  displaySubTitle: {
    fontWeight: "bold",
    paddingBottom: 5,
    color: "gray",
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
  inputSearch: {
    backgroundColor: "#06292f",
    color: "#f3b530",
    fontWeight: "bold",
  },
  loaderContacts: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  listItem: { backgroundColor: "#06292f" },
  iconRight: {
    color: "#f3b530",
  },
});
