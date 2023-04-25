import { User } from 'firebase/auth';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Observable } from 'rxjs';

interface propsObj {
  user$: Observable<User | null>,
  handleGoogleAuth: ()=>Promise<void>,
  handleSignOut: ()=>void
}

export const NavbarComponent: FunctionComponent<propsObj> = ({user$, handleGoogleAuth, handleSignOut}: propsObj) => {
  let [displayName, setDisplayName] = useState<string>('');
  user$?.subscribe((user) => {
    if (user) {
      setDisplayName(user.displayName!)
    } else {
      setDisplayName('')
    }
  })
  return (
    <div>
      <h2>{displayName ? `Hello, ${displayName}` : 'Welcome'}</h2>
      {!displayName ? <button type="button" onClick={handleGoogleAuth}> Log in with Google </button>
        : <button type="button" onClick={handleSignOut}> Sign out </button>}
    </div>
  );
}


