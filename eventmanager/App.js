import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login";
import store from "./Store";
import { Provider } from "react-redux";

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d11919",
    accent: "#e3d219"
  }
};

export default App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    </Provider>
  );
};

const AppStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login }
});

const AppContainer = createAppContainer(AppStack);
