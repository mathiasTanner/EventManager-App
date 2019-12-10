import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import {
  Title,
  TextInput,
  Text,
  Button,
  HelperText,
  Portal
} from "react-native-paper";
import { connect } from "react-redux";
import { fetchToken, showLoad } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getToken: (username, passwordHash) => {
      dispatch(fetchToken(username, passwordHash));
    },
    showLoad: isVisible => {
      dispatch(showLoad(isVisible));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return { token: state.app.token, user: state.user };
};

const Login = props => {
  const { navigate } = props.navigation;

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [passwordHidden, setPasswordHidden] = useState(true);

  useEffect(() => {
    props.showLoad(false);
  }, [props.token]); // Only re-run the effect if token changes

  const passwordHash = credentials => {
    //TODO set up password hasher
    props.getToken(credentials.username, credentials.password);
    props.showLoad(true);
  };

  return (
    <Portal.Host>
      <LoadingScreen />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
              onPress={() => {
                setPasswordHidden(!passwordHidden);
              }}
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
            <HelperText type="error" visible={props.error}>
              Erreur! pseudo ou mot de passe erroné.
            </HelperText>
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
              navigate("Register");
            }}
          >
            S'enregistrer
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Portal.Host>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
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
