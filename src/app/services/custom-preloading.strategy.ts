import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';

// avoid typing issues for now
export declare var navigator;

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {


  preload(route: Route, load: () => Observable<any>): Observable<any> {

    if(route.data["preload"]){
      return load();
    }
    else{
      of(null);
    }
  }
}
