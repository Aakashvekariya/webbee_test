import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import ProductList from "../Screens/ProductList";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddNewCategory from "../Screens/ManageCategory";
import ManageCategory from "../Screens/ManageCategory";
import ManageSubCategory from "../Screens/ManageSubCategory";

const Drawer = createDrawerNavigator();

const MainStack = () => {
  const loading = useSelector((state: any) => state.activityIndicator);
  const categoryListRD = useSelector((state) => state.machineMgt.categoryList);
  const [category, setCategory] = React.useState<[]>([]);
  React.useEffect(() => {
    setCategory([...categoryListRD]);
  }, [categoryListRD]);

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
          {category.map((item, index) => (
            <Drawer.Screen
              key={String(index)}
              name={`ManageSubCategory${index}`}
              component={ManageSubCategory}
              initialParams={{ ...item, categoryIndex: index }}
              options={{
                headerShown: false,
                title:
                  item.categoryName === "" ? "New Category" : item.categoryName,
              }}
            />
          ))}
          <Drawer.Screen
            name="ManageCategory"
            component={ManageCategory}
            options={{ headerShown: false, title: "Manage Categories" }}
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
