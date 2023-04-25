export class User {
  constructor(
    public email: string | null = null,
    public uid: string | null = null,
    private _token: string | null = null,
    private _tokenExpirationDate: Date | null = null
  ) { }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

export interface Profile {
  desc: string;
  email: string;
  imgurl: string;
  name: string;
  uname: string;
  isProfileSet?: boolean
}


export interface User1 {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
