import firebase from 'firebase/app'
import 'firebase/performance'
import 'firebase/analytics'

const client = typeof window !== 'undefined'
const config = {
  apiKey: 'AIzaSyBAbFvrd5RKudkrGPp0QQkgv_pGqkD8Znk',
  authDomain: 'advance-web-development-1376c.firebaseapp.com',
  projectId: 'advance-web-development-1376c',
  storageBucket: 'advance-web-development-1376c.appspot.com',
  messagingSenderId: '124788943310',
  appId: '1:124788943310:web:6846350a59caf107f5239f',
  measurementId: 'G-XK2LKX0ZPS'
}

// only run this in client-side
if (client && !firebase.apps.length) firebase.initializeApp(config)

// access firebase's services
const analytics =
  client && firebase.analytics.isSupported ? firebase.analytics() : null
const performance = client ? firebase.performance() : null

export { performance, analytics }
