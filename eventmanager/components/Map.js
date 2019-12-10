import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const mapStateToProps = (state, ownProps) => {
  return { events: state.events };
};

const Map = props => {
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (location == null) {
      findCurrentPositionAsync();
    }

    if (props.events !== [] || props.events.events !== undefined) {
      setEvents(props.events.events);
    }
  }, [location, props.events]);

  const findCurrentPositionAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <View style={styles.container}>
      {events === [] || events === undefined ? null : (
        <MapView
          style={{
            flex: 1
          }}
          initialRegion={{
            latitude: location == null ? 60.200692 : location.coords.latitude,
            longitude: location == null ? 24.934302 : location.coords.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={false}
          showsCompass={true}
          showsPointsOfInterest={false}
          provider="google"
        >
          {events.map((item, key) => {
            return (
              <Marker
                key={key}
                coordinate={{
                  latitude: item._embedded.location.latitude,
                  longitude: item._embedded.location.longitude
                }}
                title={item._embedded.location.name}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
};

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
