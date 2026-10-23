import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// Ele também garante que, independentemente de você carregar o aplicativo
// no Expo Go ou em uma compilação nativa, o ambiente seja configurado
// adequadamente.
registerRootComponent(App);
