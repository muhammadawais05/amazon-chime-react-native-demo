import React, { useState } from 'react';
import RootStack from './navigators/RootStack'

export default function App() {
  const [ session, setSession ] = useState({ login: false, name: '', lastname: '', email: '' })

  return (
    <RootStack session={session} setSession={setSession} />
  );
}
