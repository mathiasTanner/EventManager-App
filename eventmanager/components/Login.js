import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Title, TextInput, Text, Button } from "react-native-paper";
import { connect } from "react-redux";
import { fetchToken } from "../actions";
import { red } from "ansi-colors";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getToken: (username, passwordHash) =>
      dispatch(fetchToken(username, passwordHash))
  };
};

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [passwordHidden, setPasswordHidde] = useState(true);

  const managePasswordVisibility = () => {
    setPasswordHidde(!passwordHidden);
  };

  const passwordHash = credentials => {
    //TODO set up password hasher

    props.getToken(credentials.username, credentials.password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding v "
      enabled
    >
      <View style={styles.title}>
        <Image
          style={{ flex: 1, height: undefined, width: undefined }}
          source={require("../assets/militia_fibule.png")}
          resizeMode="contain"
        />
        <Title>Militia Genevae Event Manager</Title>
      </View>
      <View style={styles.form}>
        <TextInput
          label="Pseudo"
          mode="outlined"
          value={credentials.username}
          onChangeText={name => {
            setCredentials({ ...credentials, username: name });
          }}
        />
        <View style={styles.passView}>
          <TextInput
            label="Mot de passe"
            mode="outlined"
            underlineColor="red"
            secureTextEntry={passwordHidden}
            value={credentials.password}
            style={styles.textBox}
            onChangeText={pass => {
              setCredentials({ ...credentials, password: pass });
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={managePasswordVisibility}
          >
            <Image
              source={
                passwordHidden
                  ? require("../assets/hide.png")
                  : require("../assets/view.png")
              }
              style={styles.btnImage}
            />
          </TouchableOpacity>
        </View>
        {props.error ? (
          <Text style={styles.errorMsg}>
            Erreur! pseudo ou mot de passe erroné.
          </Text>
        ) : null}
        <View>
          <Button
            mode="text"
            style={styles.buttonPswd}
            onPress={() => {
              //TODO password forgotten component
            }}
          >
            Mot de passe oublié
          </Button>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            passwordHash(credentials);
          }}
        >
          Se Connecter
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            //TODO Register Component
          }}
        >
          S'enregistrer
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  title: {
    flex: 1
  },
  form: {
    flex: 2,
    marginTop: 10,
    width: 200
  },
  titleText: {
    fontWeight: "bold"
  },

  visibilityBtn: {
    top: 15,
    height: 40,
    width: 35,
    padding: 5
  },
  textBox: {
    width: 200
  },
  btnImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  },
  passView: {
    flexDirection: "row"
  },
  button: {
    marginTop: 5
  },
  buttonPswd: {
    marginTop: 5,
    marginBottom: 20
  },
  errorMsg: {
    color: "red"
  }
});
