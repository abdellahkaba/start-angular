import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.mode";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users : AppUser[] = []
  authenticatedUser : AppUser | undefined

  constructor() {
    this.users.push({userId : UUID.UUID(), username : "Mariam", password : "Kaba987k", roles : ["USERS"]})
    this.users.push({userId : UUID.UUID(), username : "Oumar", password : "Kaba987k", roles : ["USERS"]})
    this.users.push({userId : UUID.UUID(), username : "Abdellah", password : "Kaba987k", roles : ["USERS","ADMIN"]})
  }

  //une methode qui fait auth
  public login (username : string, password : string) : Observable<AppUser>{
    //On cherche username
   let appUser = this.users.find(u => u.username == username)
    if(!appUser) return  throwError(() => new Error("User not found"))
    if(appUser.password!=password){
      return  throwError(() => new Error("Band credential"))
    }

    return of(appUser)
  }

  //Service authentification
  public authenticateUser(appUser : AppUser) : Observable<boolean>{
    this.authenticatedUser = appUser
    //on le stocke dans le local storage
    localStorage.setItem("authUser", JSON.stringify({username : appUser.username, roles :appUser.roles, jwt : "JWT_TOKEN" }))
    return of(true)
  }

  //une methode qui verifie si cest admin ou user
  public hasRole (role : string) : boolean {
    //voir si c'est un admin
  return this.authenticatedUser!.roles.includes(role)

  }
  //Une methode qui indique si user authentifier
  public isAuthenticated () {
    return this.authenticatedUser!=undefined
  }
  ///methode de la deconnexion
  public logout (): Observable<boolean>{
    this.authenticatedUser=undefined
    localStorage.removeItem("authUser")
    return of(true)
  }
}
