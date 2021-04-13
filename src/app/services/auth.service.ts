import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth || null));
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
