import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Login from "./Login";

const mapStateToProps = (state, ownProps) => {
  return { token: state.token };
};

const HomeScreen = props => {
  const { navigate } = props.navigation;

  const [user, setUser] = useState({ username: "", password: "" });
  const [test, setTest] = useState(true);

  return (
    <View style={styles.container}>
      {props.token == "" ? (
        <Login />
      ) : (
        <Text>Home page token: {props.token}</Text>
      )}
    </View>
  );
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
