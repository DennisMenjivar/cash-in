import React, { useState, useEffect, useLayoutEffect } from "react";
import { database, auth } from "../../firebase/firebase";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  SearchBar,
  ListItem,
  Icon,
  Input,
} from "react-native-elements";

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

export default function ContactsComponent(props) {
  const { setContactToPay } = props;

  let [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [totalContacts, setTotalContacts] = useState(0);
  const [startContacts, setStartContacts] = useState(null);

  const updateSearch = (search) => {
    setSearch(search);
  };
  //   const handleChange = (id) => {
  //     let temp = contacts.map((contact) => {
  //       if (id === contact.id) {
  //         return { ...contact, isChecked: !contact.isChecked };
  //       }
  //       return contact;
  //     });
  //     setContacts(temp);
  //   };

  useEffect(async () => {
    const collectionRef = collection(
      database,
      "contacts",
      "kvngarcia",
      "contacts"
    );
    const q = query(collectionRef, orderBy("name", "asc"), limit(15));
    const querySnapshot = await getDocs(q).then((result) => {
      setTotalContacts(result.size);
      setStartContacts(result.docs[result.docs.length - 1]);

      const resultContact = [];

      result.forEach((con) => {
        const pContact = con.data();
        pContact.id = con.id;

        resultContact.push(pContact);
      });
      setContacts(resultContact);
    });

    // const collectionRef = collection(database, "users");
    // const q = query(collectionRef);
    // onSnapshot(
    //   q,
    //   (snapshot) => {
    //     const dat = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       name: doc.data().name,
    //       isChecked: false,
    //     }));
    //     setContacts(...contacts, dat);
    //   },
    //   (error) => {
    //     console.log("Error: ", error.code);
    //   }
    // );
  }, []);

  //   const getContacts = async () => {
  //     const querySnapshot = await getDocs(collection(database, "users"));
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   };

  //   let selected = contacts.filter((contact) => contact.isChecked);

  const onChangeSearch = (value) => {
    console.log("Value: ", value);
  };

  function ContactsFn(par) {
    const { params } = par;
    const { id, name, telephoneNumber } = params.item;

    return (
      <TouchableOpacity onPress={() => setContactToPay(params.item)}>
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
            <Text style={styles.displaySubTitle}>{telephoneNumber}</Text>
          </View>
        </ListItem>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View>
        <Input
          placeholder="Seleccionar contacto"
          containerStyle={styles.inputSearch}
          onChange={(e) => onChange(e, "email")}
          rightIcon={
            <Icon
              type="material-community"
              name="magnify"
              iconStyle={styles.iconRight}
            />
          }
        />
      </View>

      <View
        key={"contactsView"}
        style={styles.SubViewContainer}
        onTouchStart={Keyboard.dismiss}
      >
        {contacts.length > 0 ? (
          <FlatList
            data={contacts}
            renderItem={(param) => <ContactsFn params={param} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.loaderContacts}>
            <ActivityIndicator size={"large"} />
            <Text style={{ color: "#f3b530" }} key={"nohay"}>
              Cargando contactos
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
