// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDk9ZaFpJILG21O89mmYeCtw5Lim5Ww3bE",
  authDomain: "peluqueria-35973.firebaseapp.com",
  projectId: "peluqueria-35973",
  storageBucket: "peluqueria-35973.firebasestorage.app",
  messagingSenderId: "1094200770487",
  appId: "1:1094200770487:web:e6b5d4951f900cec91f232",
  measurementId: "G-VGYRG6GDL1",
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export { db };