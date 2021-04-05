import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, UrlSerializer} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {CanLoadAuthGuard} from './services/can-load-auth.guard'
import { CustomPreloadingStrategy } from './services/custom-preloading.strategy';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    //needsexact match, ensure redirect happens only in localhost:4200/ -- >{home}/
    pathMatch: "full"
  },
  {
    path: "courses",
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    //canLoad: [CanLoadAuthGuard],
    data:{preload:true},
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        //detailed logging while routing
        enableTracing: true,
        preloadingStrategy: CustomPreloadingStrategy,
        //parameters RECOMENDED for every Angular
        //goes to last screen position
        scrollPositionRestoration:'enabled',
        //stores Query params from Acess routes
        paramsInheritanceStrategy: 'always',
        // avoid writing urls when dealing wth empty path components
        relativeLinkResolution: 'corrected',
        //unknonw charakter in url -> send to notFound.Component
        malformedUriErrorHandler:
        (error: URIError, UrlSerializer: UrlSerializer, url:string)=>
          UrlSerializer.parse("page-not-found")
      })

  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard]
})
export class AppRoutingModule {


}
