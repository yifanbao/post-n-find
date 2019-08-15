import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = async () => {
  const sources = await Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
  ]);

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'post-n-find.PostItem',
        label: 'Create',
        title: 'Create',
        icon: sources[0],
        navigatorButtons: {
          leftButtons: [
            { icon: sources[2], title: 'Menu', id: 'sideDrawerToggle' }
          ]
        }
      },
      {
        screen: 'post-n-find.FindItem',
        label: 'Found',
        title: 'Found',
        icon: sources[1],
        navigatorButtons: {
          leftButtons: [
            { icon: sources[2], title: 'Menu', id: 'sideDrawerToggle' }
          ]
        }
      }
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: "orange"
    },
    drawer: {
      left: {
        screen: 'post-n-find.SideDrawer'
      }
    },
    appStyle: {
      tabBarSelectedButtonColor: "orange"
    }
  });
};

export default startTabs;
