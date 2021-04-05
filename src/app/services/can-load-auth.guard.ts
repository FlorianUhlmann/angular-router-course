import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class CanLoadAuthGuard implements CanLoad {
  constructor(private auth: AuthStore, private router:Router) { }

  canLoad(route: Route):Observable<boolean>{
    //isLoggedIn& is "long running"-> does not complete by itselt
    //-> must be forced to emit val-> first()
    return this.auth.isLoggedIn$
      .pipe(
          first(),
          //is not logggedIn redirect to login page
          tap(loggedIn =>{
            this.router.navigateByUrl("/login");
          })
      );
  }
}
