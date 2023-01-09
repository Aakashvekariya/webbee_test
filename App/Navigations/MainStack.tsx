import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screens/Home';
import ManageCategory from '../Screens/ManageCategory';
import ManageSubCategory from '../Screens/ManageSubCategory';

const Drawer = createDrawerNavigator();

function MainStack() {
  const categoryListRD = useSelector((state:{machineMgt:any}) => state.machineMgt.categoryList);
  const [category, setCategory] = React.useState<[]>([]);
  React.useEffect(() => {
    setCategory([...categoryListRD]);
  }, [categoryListRD]);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            width: '85%',
          },
          drawerType: 'front',
          headerShown: false,
          keyboardDismissMode: 'on-drag',
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
                  item.categoryName === '' ? 'New Category' : item.categoryName,
            }}
          />
        ))}
        <Drawer.Screen
          name="ManageCategory"
          component={ManageCategory}
          options={{ headerShown: false, title: 'Manage Categories' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
