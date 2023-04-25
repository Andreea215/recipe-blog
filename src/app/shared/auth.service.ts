import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut, user  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);

  constructor() {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: GoogleAuthProvider) {
    try {
      signInWithPopup(this.auth, provider);
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  SingOut() {
    signOut(this.auth).then(() => {
      window.alert("Sign-out successful.");
    }).catch((error:any) => {
      window.alert(error.message);
    });
  }

  getUser() {
    return this.user$;
  }
}
