import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import ProductList from "../Screens/ProductList";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddNewCategory from "../Screens/AddNewCategory";

const Drawer = createDrawerNavigator();

const MainStack = () => {
  const loading = useSelector((state: any) => state.activityIndicator);
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          // drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              width: "85%",
            },
            drawerType: "front",
            headerShown: false,
            keyboardDismissMode: "on-drag",
          }}
        >
          <Drawer.Screen
            name="Dashboard"
            component={Home}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="AddNewCategory"
            component={AddNewCategory}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <Loader
        isVisible={loading.rootLoader}
        title={loading.rootLoaderTitle || "Loading"}
      />
    </>
  );
};

export default MainStack;
