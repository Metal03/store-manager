import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userAuth: Observable<firebase.default.User>;
  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 
    this.userAuth = afsAuth.authState;
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth || null));
  }

  isLogged(): Observable<any> {
    return this.afsAuth.authState.pipe(map(auth => auth ? true : false ));
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass)
          .then( userData => resolve(userData)
          ,err => reject(err))
    });
  }
  
  logoutUser() {
    return this.afsAuth.signOut();
  }
}
