import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5DPMWEDvudqAn4TTrVLpgx7nEFrMDQWs",
    authDomain: "scheduler-23e9b.firebaseapp.com",
    databaseURL: "https://scheduler-23e9b-default-rtdb.firebaseio.com",
    projectId: "scheduler-23e9b",
    storageBucket: "scheduler-23e9b.appspot.com",
    messagingSenderId: "902934215020",
    appId: "1:902934215020:web:dd2a4e5eeb382cb1625b49",
    measurementId: "G-XTLDKK8QTP"
  };

  const firebase = initializeApp(firebaseConfig);
  const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };