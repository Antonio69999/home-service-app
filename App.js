import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./App/Screens/LoginScreen/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error(err);
    }
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Outif: require("./assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("./assets/fonts/Outfit-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // console.log(fontsLoaded);
  // console.log(fontError);

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <View style={styles.container}>
        {/* Sign In Component */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigation></TabNavigation>
          </NavigationContainer>
        </SignedIn>
        {/* Sign Out Component */}
        <SignedOut>
          <Login></Login>
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
});
