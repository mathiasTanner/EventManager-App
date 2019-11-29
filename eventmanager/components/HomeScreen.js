import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Login from "./Login";

const mapStateToProps = (state, ownProps) => {
  return { token: state.app.token };
};

const HomeScreen = props => {
  const { navigate } = props.navigation;

  const [user, setUser] = useState({ username: "", password: "" });

  return (
    <View style={styles.container}>
      {props.token == "" ? (
        <Login error={false} navigation={props.navigation} />
      ) : //<Login error={false} navigation={props.navigation} />
      props.token == "no token found" ? (
        <Login error={true} navigation={props.navigation} />
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
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center"
  }
});
