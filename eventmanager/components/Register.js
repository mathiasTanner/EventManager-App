import React, { useState } from "react";
import { connect } from "react-redux";
import { sha256 } from "js-sha256";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  Title,
  TextInput,
  Text,
  Button,
  Switch,
  HelperText
} from "react-native-paper";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createUser: (username, passwordHash, mail, hascar) =>
      dispatch(createUser(username, passwordHash, mail, hascar))
  };
};

const Register = props => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    secondPass: "",
    passwordHash: "",
    mail: "",
    hasCar: false
  });
  const [passwordHidden, setPasswordHidden] = useState(true);

  const passwordHash = () => {
    let pass = sha256(userInfo.passwordHash);
    console.log(userInfo.passwordHash);

    console.log(pass);

    //TODO set up password hasher
    /*  props.createUser(
      userInfo.username,
      userInfo.passwordHash,
      userInfo.mail,
      userInfo.hasCar
    ); */
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <View style={styles.titleView}>
          <Image
            style={styles.img}
            source={require("../assets/militia_fibule.png")}
            resizeMode="contain"
          />
          <View style={styles.title}>
            <Title>Rentrez vos données:</Title>
          </View>
        </View>

        <View style={styles.form}>
          <ScrollView>
            <TextInput
              label="Pseudo"
              mode="outlined"
              value={userInfo.username}
              onChangeText={name => {
                setUserInfo({ ...userInfo, username: name });
              }}
            />
            <TextInput
              label="Mot de passe"
              mode="outlined"
              secureTextEntry={passwordHidden}
              value={userInfo.passwordHash}
              style={styles.textBox}
              onChangeText={pass => {
                setUserInfo({ ...userInfo, passwordHash: pass });
              }}
            />
            <View style={styles.passView}>
              <TextInput
                label="Confirmez le Mot de passe"
                mode="outlined"
                secureTextEntry={passwordHidden}
                value={userInfo.secondPass}
                style={styles.textBox}
                onChangeText={pass => {
                  setUserInfo({ ...userInfo, secondPass: pass });
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
            {userInfo.passwordHash !== "" &&
            userInfo.passwordHash.length < 8 ? (
              <HelperText type="error" visible={true}>
                Le mot de passe doit faire au moins 8 caractères
              </HelperText>
            ) : userInfo.passwordHash !== userInfo.secondPass ? (
              <HelperText type="error" visible={true}>
                Les mots de passe ne correspondent pas
              </HelperText>
            ) : null}
            <TextInput
              label="E-Mail"
              mode="outlined"
              value={userInfo.mail}
              onChangeText={mail => {
                setUserInfo({ ...userInfo, mail: mail });
              }}
            />
            {!userInfo.mail.includes("@") && userInfo.mail !== "" ? (
              <HelperText type="error" visible={true}>
                Ce mail n'est pas valide
              </HelperText>
            ) : null}

            <View style={styles.switchView}>
              <Text>Avez-vous une voiture?</Text>
              <Switch
                value={userInfo.hasCar}
                style={styles.switch}
                onValueChange={hasCar => {
                  setUserInfo({ ...userInfo, hasCar });
                }}
              />
            </View>
            <View style={styles.buttonview}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                  passwordHash();
                }}
              >
                S'enregistrer
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default connect(null, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    paddingTop: "2%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#FFFF"
  },
  titleView: {
    flex: 1
  },
  img: { flex: 1, height: undefined, width: undefined },
  title: { alignItems: "center" },
  form: {
    flex: 3,
    marginTop: 20,
    margin: 5,
    width: 270
  },
  switchView: {
    margin: 10,
    flexDirection: "row"
  },
  switch: {
    marginLeft: 50
  },
  visibilityBtn: {
    top: 15,
    height: 40,
    width: 35,
    padding: 5
  },
  textBox: {
    width: 245
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
    marginTop: 5,
    width: 200
  },
  buttonview: {
    alignItems: "center"
  }
});
