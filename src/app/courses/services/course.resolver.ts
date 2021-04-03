import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesRoutingModule } from '../courses-routing.module';
import { Course } from '../model/course';
import { CoursesService } from './courses.service';

@Injectable()
export class CourseResolver implements Resolve<Course> {

  constructor(private courses: CoursesService){}

  //reactive pattern programming wanted -> needs Observable
  resolve(route: ActivatedRouteSnapshot): Observable<Course> {

    //get param from current url by paramMap
    const courseUrl = route.paramMap.get("courseUrl");
    return this.courses.loadCourseByUrl(courseUrl)
  }
}
