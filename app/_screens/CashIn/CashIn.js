import React, { useState, useEffect } from "react";
import { Input, Icon, Button, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import ContactsComponent from "./ContactsComponent";

export default function CashIn() {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [preNumber, setPreNumber] = useState(
    Array.from({ length: 9 }, (prev, current) => current + 1)
  );
  const [number, setNumber] = useState([...preNumber, -1, "0", -2]);
  let [amount, setAmount] = useState("");

  function currencyFormat(num) {
    return "L" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const pay = () => setShowModal(true);

  return (
    <View key={"viewPrincipal"} style={styles.viewContainter}>
      {/* Title */}
      <View key={"subView"} style={styles.titlesView}>
        <Text
          numberOfLines={1}
          style={styles.titleText}
          adjustsFontSizeToFit={true}
          justifyContent={"center"}
          key={"textNumber"}
        >
          {/* {currencyFormat(amount)} */}
          {amount != "" ? amount : 0}
        </Text>
        <Text style={styles.titleCurrency} key={"textCurrency"}>
          Lempiras
        </Text>
      </View>
      {/* Buttons numbers */}
      <View style={styles.buttonsContainter} key={"viewButtons"}>
        {number.map((item, index) => {
          return (
            <View style={styles.row} key={"viewButton" + index}>
              <Button
                key={index}
                title={(res) => {
                  let name = "";
                  if (item == "-1") {
                    name = ".";
                  } else if (item == "-2") {
                    name = "<";
                  } else {
                    name = item;
                  }
                  return (
                    <Text key={"textButton" + index} style={styles.textButton}>
                      {name}
                    </Text>
                  );
                }}
                buttonStyle={styles.button}
                onPress={(e) => {
                  if (item == -2) {
                    let temp = amount.toString().slice(0, -1);
                    setAmount(temp);

                    if (amount.toString().charAt(amount.length - 2) == ".") {
                      let temp1 = amount.toString().slice(0, -2);
                      setAmount(temp1);
                    } else {
                    }
                  } else if (item == "0" && amount == "") {
                    // No pasa nada porque no puefe ir ese numero
                  } else if (item == "-1") {
                    if (amount.length > 0) {
                      if (!amount.toString().includes(".")) {
                        setAmount((amount += "."));
                      }
                    }
                  } else {
                    setAmount((amount += item.toString()));
                  }
                }}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.optionButtonsContainer}>
        <View style={styles.rowButtonOptions}>
          <Button
            title={(res) => {
              return <Text style={styles.textRequestButton}>{"Cobrar"}</Text>;
            }}
            icon={
              <Icon
                type="material-community"
                name="call-received"
                iconStyle={styles.iconRequest}
              />
            }
            // onPress={GetContacts}
            buttonStyle={styles.requestButton}
          ></Button>
        </View>
        <View style={styles.rowButtonOptions}>
          <Button
            title={(res) => {
              return <Text style={styles.textRequestButton}>{"Pagar"}</Text>;
            }}
            buttonStyle={styles.requestButton}
            icon={
              <Icon
                type="material-community"
                name="call-made"
                iconStyle={styles.iconPay}
              />
            }
            onPress={() => {
              amount != 0
                ? navigation.navigate("pay", {
                    amount: amount,
                    username: "dnsmenjivar",
                  })
                : setShowToast(true);
            }}
          ></Button>
        </View>
      </View>
      {/* <Modal isVisible={true} setIsVisible={setShowModal}>
        <ContactsComponent />
      </Modal> */}
      <Toast
        isVisible={showToast}
        setIsVisible={setShowToast}
        timer={1000}
        title={"Warning"}
        message={"Por favor ingrese una cantidad para poder realizar un pago."}
        kind={"error"}
      ></Toast>
    </View>
  );
}

const styles = StyleSheet.create({
  iconRequest: {
    color: "green",
  },
  iconPay: {
    color: "red",
  },
  titleCurrency: {
    textAlign: "center",
    fontSize: 20,
  },
  textRequestButton: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  titleText: {
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#F5F208",
    height: "80%",
    width: "100%",
    fontSize: 500,
    marginTop: "10%",
    marginRight: "10%",
    // fontWeight: "bold",
  },
  requestButton: {
    width: "100%",
    height: "90%",
    backgroundColor: "#E4E119",
    color: "grey",
    // borderWidth: 2,
    borderRadius: 30,
    borderColor: "black",
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  row: {
    backgroundColor: "transparent",
    width: "33%",
    height: "25%",
    margin: 0.5,
  },
  rowButtonOptions: {
    width: "46%",
    height: "70%",
    // margin: "4%",
    marginLeft: "1%",
    marginRight: "1%",
  },
  viewContainter: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F208",
    flex: 1,
  },
  buttonsContainter: {
    height: "45%",
    width: "100%",
    backgroundColor: "transparent",
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titlesView: {
    height: "40%",
    width: "80%",
    backgroundColor: "transparent",
    marginLeft: "10%",
    marginRight: "10%",
    flex: 2,
  },
  optionButtonsContainer: {
    height: "15%",
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    color: "grey",
  },
});

// const setData = (e) => {
// const collectionRef = collection(database, "users");
// addDoc(collectionRef, { name: "Dennis M", key: "04597" });
// const collectionRef = collection(database, "users");
// setDoc(doc(database, "users", "04599"), {
//   name: "Jeremy Menjivar",
//   key: "04597",
// });
// onSnapshot(collectionRef, (snapshot) => {
//   snapshot.forEach((item) => {
//     console.log("User: ", item.data());
//   });
// });
// const ref = doc(database, "users", "04597");
// const docSnap = getDoc(ref).then((result) => {
//   console.log("Users: ", result.data());
// });
// };
