import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDWSIOZE9_A-NPOE3dVAkN9twga-tI6h2A',
  authDomain: 'notnew-dd1c7.firebaseapp.com',
  projectId: 'notnew-dd1c7',
  storageBucket: 'notnew-dd1c7.appspot.com',
  messagingSenderId: '427212155605',
  appId: '1:427212155605:web:cc3723650e47fdf200d05c',
  databaseURL: 'https://notnew-dd1c7-default-rtdb.firebaseio.com',
};

export default Firebase = () => {
  console.log('firebase.apps::: ', firebase.apps);
  if (!firebase.apps.length) {
    // console.log('initialized.......');
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
