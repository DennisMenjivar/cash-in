import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, Text, Icon, Button } from "react-native-elements";

export default function Toast(props) {
  const { isVisible, setIsVisible, children, timer, title, message, kind } =
    props;

  const CloseModal = () => setIsVisible(false);

  // setTimeout(() => {
  //   setIsVisible(false);
  // }, timer);

  const getBackgroundColor = () => {
    switch (kind) {
      case "error":
        return { backgroundColor: "#f23950" };
        break;
      case "warning":
        return { backgroundColor: "#ffb70a" };
        break;
      case "success":
        return { backgroundColor: "#75d010" };
        break;
      case "info":
        return { backgroundColor: "#36c4fc" };
        break;
      default:
        break;
    }
  };

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={[styles.overlay, getBackgroundColor()]}
      onBackdropPress={CloseModal}
    >
      <Button style={styles.closeButton}>
        <Text>Close</Text>
      </Button>
      <View style={{ height: "100%", flexDirection: "row" }}>
        <View style={{ flex: 1, alignSelf: "center" }}>
          <Icon
            type="material-community"
            name="alert-circle"
            iconStyle={styles.icon}
          />
        </View>
        <View style={{ flex: 6 }}>
          <View style={{ height: "100%", flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{ flex: 5 }}>
              <Text style={styles.message}>{message}</Text>
            </View>
          </View>
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    // backgroundColor: "#f23950",
    width: "90%",
    margin: 0,
    padding: 0,
    borderRadius: 10,
    bottom: "10%",
    position: "absolute",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  title: {
    paddingTop: "5%",
    paddingLeft: "0%",
    paddingBottom: "0%",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
  },
  message: {
    paddingLeft: "0%",
    paddingTop: "1%",
    paddingBottom: "5%",
    textAlignVertical: "center",
    color: "white",
    paddingRight: "3%",
  },
  icon: {
    color: "white",
    fontSize: 27,
  },
  closeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ee6e73",
    position: "absolute",
    top: 0,
    right: 0,
  },
});
