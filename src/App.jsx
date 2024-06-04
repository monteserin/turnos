import { useEffect } from 'react';
import { auth } from './components/Login/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import Login from './components/Login';
import { useUIDContext } from './app/providers/UIDProvider';

const App = () => {
  const [uid, setUid] = useUIDContext();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      user ? setUid(user.uid) : setUid(undefined);
    })
  }, []);

  return (
    <>{uid ? <Home /> : <Login />}</>
  )
}

export default App;