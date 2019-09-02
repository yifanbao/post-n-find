import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth';
import PostRedirection from './src/screens/PostRedirection';
import PostLostNotice from './src/screens/PostLostNotice';
import PostFoundNotice from './src/screens/PostFoundNotice';
import ViewLostNotice from './src/screens/ViewLostNotice';
import ViewFoundNotice from './src/screens/ViewFoundNotice';
import LostNoticeDetail from './src/screens/LostNoticeDetail';
import FoundNoticeDetail from './src/screens/FoundNoticeDetail';
import SideDrawer from './src/screens/SideDrawer';
import configStore from './src/store/configStore';

const store = configStore();

// Register Screens
Navigation.registerComponent('post-n-find.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('post-n-find.PostRedirectionScreen', () => PostRedirection, store, Provider);
Navigation.registerComponent('post-n-find.PostLostNoticeScreen', () => PostLostNotice, store, Provider);
Navigation.registerComponent('post-n-find.PostFoundNoticeScreen', () => PostFoundNotice, store, Provider);
Navigation.registerComponent('post-n-find.ViewLostNoticeScreen', () => ViewLostNotice, store, Provider);
Navigation.registerComponent('post-n-find.ViewFoundNoticeScreen', () => ViewFoundNotice, store, Provider);
Navigation.registerComponent('post-n-find.LostNoticeDetailScreen', () => LostNoticeDetail, store, Provider);
Navigation.registerComponent('post-n-find.FoundNoticeDetailScreen', () => FoundNoticeDetail, store, Provider);
Navigation.registerComponent('post-n-find.SideDrawer', () => SideDrawer, store, Provider);

// Start an App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'post-n-find.AuthScreen',
    title: 'Login'
  }
});
