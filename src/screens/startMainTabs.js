import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = async () => {
  const sources = await Promise.all([
    Icon.getImageSource('ios-share-alt', 30),
    Icon.getImageSource('md-map', 30)
  ]);

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'post-n-find.PostItem',
        label: 'Create',
        title: 'Create',
        icon: sources[0]
      },
      {
        screen: 'post-n-find.FindItem',
        label: 'Found',
        title: 'Found',
        icon: sources[1]
      }
    ]
  });
};

export default startTabs;
