import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../styles/colors';

const startTabs = async () => {
  const sources = await Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
  ]);

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'post-n-find.PostRedirectionScreen',
        label: 'Post',
        title: 'Post',
        icon: sources[0],
        navigatorButtons: {
          leftButtons: [
            { icon: sources[2], title: 'Menu', id: 'sideDrawerToggle' }
          ]
        }
      },
      {
        screen: 'post-n-find.ViewFoundNoticeScreen',
        label: 'Found',
        title: 'Found Notices',
        icon: sources[1],
        navigatorButtons: {
          leftButtons: [
            { icon: sources[2], title: 'Menu', id: 'sideDrawerToggle' }
          ]
        }
      }
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: COLORS.PURPLE
    },
    drawer: {
      left: {
        screen: 'post-n-find.SideDrawer'
      }
    },
    appStyle: {
      tabBarSelectedButtonColor: COLORS.PURPLE
    }
  });
};

export default startTabs;
