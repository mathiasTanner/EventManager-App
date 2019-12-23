import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import Login from "./Login";
import Map from "./Map";
import { fetchEvents, fetchUser } from "../actions";
import {
  Text,
  Appbar,
  Menu,
  Divider,
  Modal,
  ThemeProvider
} from "react-native-paper";

const mapStateToProps = (state, ownProps) => {
  return { token: state.app.token, user: state.user, events: state.events };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEvents: token => {
      dispatch(fetchEvents(token));
    },
    getUserFromToken: (token, username) => {
      dispatch(fetchUser(token, username));
    }
  };
};

const HomeScreen = props => {
  const { navigate } = props.navigation;

  const [showMap, setShowMap] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (props.token !== "no token found" && props.token !== "") {
      props.getEvents(props.token);
      if (props.events !== [] || props.events.events !== undefined) {
        setShowMap(true);
      }
    }
    if (props.user !== null && props.user.passwordHash == null) {
      props.getUserFromToken(props.token, props.user.username);
    }
  }, [props.token, props.user]);

  const _changeMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      {props.token == "" ? (
        <Login error={false} navigation={props.navigation} />
      ) : props.token == "no token found" ? (
        <Login error={true} navigation={props.navigation} />
      ) : (
        <View style={styles.mainView}>
          <Appbar.Header>
            <Menu
              visible={isMenuVisible}
              onDismiss={() => _changeMenuVisibility()}
              anchor={
                <Appbar.Action
                  icon="menu"
                  onPress={() => _changeMenuVisibility()}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  console.log("profile");
                }}
                title="Profile"
              />
              <Menu.Item
                onPress={() => {
                  console.log("my events");
                }}
                title="Mes Évènements"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  console.log("all events");
                }}
                title="Tous les Évènements"
              />
            </Menu>
          </Appbar.Header>
          {showMap ? (
            <View style={styles.map}>
              <Map />
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  mainView: {
    flex: 1,
    backgroundColor: "#d11919"
  },
  map: {
    width: Math.round(Dimensions.get("window").width),
    height: Math.round(Dimensions.get("window").height)
  }
});
