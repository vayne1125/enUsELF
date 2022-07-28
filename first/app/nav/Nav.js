// import {Component} from 'react';
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
//import {TabNavigator} from '@react-navigation/native'
//import TabNavigator from 'react-native-tab-navigator';
//import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
//import ThemeScreen from '../theme/Theme';
import Theme from '../theme/Theme';
import Media from '../media/Media';
import Personal from '../personal/Personal';
import ListScreen from '../list/List';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
// export default class Nav extends Component {
//   render() {
//     return (
//       <View>
//         <Text>123</Text>
//       </View>
//     );
//   }
// }

/*export default Nav = TabNavigator({
    Theme:{
      screen: ThemeScreen
    },
    SocialMedia:{
      screen: SocialMediaScreen
    }
})*/

// function HomeScreen() {
//   return (
//     <View >
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View >
//       <Text>Settings!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

const Nav = () => {
  return (
    //----底下bar------------------------------------
    <Tab.Navigator
      //initialRouteName="login"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          //let iconName = 'home';
          let iconName;
          if (route.name === 'Theme') {
            iconName = focused ? 'apps' : 'apps-outline';
            size = focused ? size + 8 : size+3;
          } else if (route.name === 'Media') {
            iconName = focused ? 'people' : 'people-outline';
            size = focused ? size + 8 : size+3;
          }
          else if (route.name === 'Personal') {
            iconName = focused ? 'settings' : 'settings-outline';
            size = focused ? size + 8 : size+3;
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5f695d',//按下:灰色
        tabBarInactiveTintColor: 'white',//沒按
        headerShown: false,//不顯示在標頭
        tabBarStyle: {  //底下bar的圓弧和陰影設計
          backgroundColor: '#88bd80',
          position: 'absolute',
          bottom: 18,
          left: 8,
          right: 10,
          elevation: 0,
          borderRadius: 20,
          //hight: 100,
          width:380,
          ...styles.shadow,
        },
        tabBarShowLabel:false,
      })}>
      <Tab.Screen name="Theme" component={Theme} />
      <Tab.Screen name="Media" component={Media} />
      <Tab.Screen name="Personal" component={Personal} />
    </Tab.Navigator>

    );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container:{
    flex:1,
    backgroundColor:'white',
  }
});

export default Nav;
