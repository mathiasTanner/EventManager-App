import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Login from "./Login";
import { fetchEvents } from "../actions";
import { Dimensions } from "react-native";

const mapStateToProps = (state, ownProps) => {
  return { token: state.app.token, user: state.user };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEvents: token => {
      dispatch(fetchEvents(token));
    }
  };
};

const Map = props => {
  const [position, setPosition] = useState({ lat: 0.0, lon: 0.0 });
  return (
    <View style={styles.container}>
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        <Marker
          coordinate={{
            latitude: 60.201373,
            longitude: 24.934041
          }}
          title="Haaga-Helia"
        />
      </MapView>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
