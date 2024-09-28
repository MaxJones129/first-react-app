'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

// import { Button } from 'react-bootstrap';
// import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { postFact, updateFact } from '../api/facts';

// const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

function Home() {
  const [uselessFact, setUselessFact] = useState({});
  const { user } = useAuth();

  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();

    setUselessFact(fact);
  };

  const selectResponse = async (boolean) => {
    const val = boolean ? 'Yes' : 'No';
    const obj = {
      userId: user.uid,
      text: uselessFact.text,
    };

    const response = await postFact(obj, val);
    await updateFact({ firebaseKey: response.name }, val);

    fetchFact();
    return obj;
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <h2>{uselessFact.text}</h2>

      <h4>DId you know this fact?</h4>
      <button className="btn btn-success" type="button" onClick={() => selectResponse(true)}>
        YES
      </button>
      <button className="btn btn-danger" type="button" onClick={() => selectResponse(false)}>
        NO
      </button>
    </>
    // <div
    //   className="text-center d-flex flex-column justify-content-center align-content-center"
    //   style={{
    //     height: '90vh',
    //     padding: '30px',
    //     maxWidth: '400px',
    //     margin: '0 auto',
    //   }}
    // >
    //   <h1>Hello {user.displayName}! </h1>
    //   <p>Click the button below to logout!</p>
    //   <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
    //     Sign Out
    //   </Button>
    // </div>
  );
}

export default Home;
