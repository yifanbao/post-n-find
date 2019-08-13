import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = async () => {
  const sources = await Promise.all([
    Icon.getImageSource('ios-share-alt', 30),
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-menu', 30)
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
    drawer: {
      left: {
        screen: 'post-n-find.SideDrawer'
      }
    }
  });
};

export default startTabs;
