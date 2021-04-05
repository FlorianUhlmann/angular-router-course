import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { LessonDetailComponent } from './lesson/lesson-detail.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { CourseResolver } from './services/course.resolver';
import { LessonsResolver } from './services/lessons.resolver';
import { LessonDetailResolver } from './services/lesson-detail.resolver';
import { AuthGuard } from '../services/auth.guard';
import { ConfirmExitGuard } from '../services/confirm-exit.guard';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    //canDeactivate only applied to routes, NOT childroutes!
    canDeactivate: [ConfirmExitGuard],
    children:[
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: LessonsResolver
        }
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve:{
          lesson: LessonDetailResolver
        }
      }
    ],
    resolve: {
      course: CourseResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CourseResolver,
    LessonsResolver,
    LessonDetailResolver,
    AuthGuard,
    ConfirmExitGuard
  ]
})
export class CoursesRoutingModule {



}
