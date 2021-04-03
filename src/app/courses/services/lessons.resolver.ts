import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonSummary } from '../model/lesson-summary';
import { CoursesService } from './courses.service';

@Injectable()
export class LessonsResolver implements Resolve<LessonSummary[]> {

  constructor(private courses: CoursesService){}

  resolve(route: ActivatedRouteSnapshot): Observable<LessonSummary[]>{

    const courseUrl = route.paramMap.get("courseUrl");

    return this.courses.loadAllCourseLessonsSummary(courseUrl,);
  }
}
