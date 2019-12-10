import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sha256 } from "js-sha256";
import { createUser } from "../actions";
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
    register: (username, passwordHash, mail, hascar) =>
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
  const [pswdLengthVisible, setPswdLengthVisible] = useState(false);
  const [pswdMatchVisible, setPswdMatchVisible] = useState(false);
  const [mailValidVisible, setMailValidVisible] = useState(false);
  const [isInfoNotValid, setIsInfoNotValid] = useState(true);
  const [passwordHidden, setPasswordHidden] = useState(true);


  const createUser = () => {
    let pass = sha256(userInfo.passwordHash);
    props.register(userInfo.username, pass, userInfo.mail, userInfo.hasCar);
    
  };

  const fieldValidator = () => {
    if (userInfo.passwordHash !== "" && userInfo.passwordHash.length < 8) {
      setPswdLengthVisible(true);
    } else {
      setPswdLengthVisible(false);
    }
    userInfo.secondPass !== "" && userInfo.secondPass !== userInfo.passwordHash
      ? setPswdMatchVisible(true)
      : setPswdMatchVisible(false);
    userInfo.mail !== "" &&
    !userInfo.mail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ? setMailValidVisible(true)
      : setMailValidVisible(false);

    if (
      userInfo.username !== "" &&
      userInfo.passwordHash !== "" &&
      !pswdLengthVisible &&
      !pswdMatchVisible &&
      userInfo.mail !== "" &&
      !mailValidVisible
    ) {
      setIsInfoNotValid(false);
    } else {
      setIsInfoNotValid(true);
    }
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
                fieldValidator();
              }}
              onBlur={() => {
                fieldValidator();
              }}
            />
            <TextInput
              label="Mot de passe"
              mode="outlined"
              secureTextEntry={passwordHidden}
              value={userInfo.passwordHash}
              onChangeText={pass => {
                setUserInfo({ ...userInfo, passwordHash: pass });
                fieldValidator();
              }}
              onBlur={() => {
                fieldValidator();
              }}
            />
            {pswdLengthVisible ? (
              <HelperText type="error" visible={true}>
                Le mot de passe doit faire au moins 8 caractères
              </HelperText>
            ) : null}
            <View style={styles.passView}>
              <TextInput
                label="Confirmez le Mot de passe"
                mode="outlined"
                secureTextEntry={passwordHidden}
                value={userInfo.secondPass}
                style={styles.textBox}
                onChangeText={pass => {
                  setUserInfo({ ...userInfo, secondPass: pass });
                  fieldValidator();
                }}
                onBlur={() => {
                  fieldValidator();
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
            {pswdMatchVisible ? (
              <HelperText type="error" visible={true}>
                Les mots de passe ne correspondent pas
              </HelperText>
            ) : null}
            {
              //TODO put a test to see if the mail is already taken
            }
            <TextInput
              label="E-Mail"
              mode="outlined"
              value={userInfo.mail}
              onChangeText={mail => {
                setUserInfo({ ...userInfo, mail: mail });
                fieldValidator();
              }}
              onBlur={() => {
                fieldValidator();
              }}
            />
            {mailValidVisible ? (
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
                  fieldValidator();
                }}
              />
            </View>
            <View style={styles.buttonview}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                  createUser();
                }}
                disabled={isInfoNotValid}
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
    width: 290
  },
  switchView: {
    margin: 10,
    flexDirection: "row"
  },
  switch: {
    marginLeft: 90
  },
  visibilityBtn: {
    top: 15,
    height: 40,
    width: 35,
    padding: 5
  },
  textBox: {
    width: 260
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
