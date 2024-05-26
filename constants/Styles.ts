import Colors from "./Colors";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
  headingText: {
    fontSize: 42,
    color: Colors.green,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    fontFamily: "Avenir-Next",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    width: "50%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    color: "#fff",
    fontWeight: "bold",
  },
  pickDateButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    width: "70%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  pickDateButtonText: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    color: "#fff",
    fontWeight: "bold",
  },
  pickTimeButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    width: "70%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  pickTimeButtonText: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    width: "50%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    color: "#fff",
    fontWeight: "bold",
  },
  line: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    height: hp(5),
    marginTop: -5,
    borderRadius: 10
  },
});
