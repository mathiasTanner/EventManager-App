import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Portal, Modal, Card } from "react-native-paper";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.app.token,
    user: state.user,
    visible: state.app.isLoadingVisible
  };
};

const LoadingScreen = props => {
  return (
    <Portal>
      <Modal visible={props.visible}>
        <View styles={styles.container}>
          <Card>
            <Card.Cover
              source={require("../assets/loading.png")}
              style={styles.card}
            />
          </Card>
          <Image
            style={{ flex: 1, height: undefined, width: undefined }}
            source={require("../assets/loading.png")}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    height: 400
  }
});

export default connect(mapStateToProps)(LoadingScreen);
