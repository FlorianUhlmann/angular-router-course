import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonDetail } from '../model/lesson-detail';
import { CoursesService } from './courses.service';

@Injectable()
export class LessonDetailResolver implements Resolve<LessonDetail> {


  constructor(private course: CoursesService){};

  resolve(route: ActivatedRouteSnapshot): Observable<LessonDetail> {

    const courseURL = route.parent.paramMap.get("courseUrl")

    const lessonSeqNo = route.paramMap.get("lessonSeqNo")
    console.log(`params : &{courseURL} ${lessonSeqNo}`)
    return this.course.loadLessonDetail(courseURL,lessonSeqNo);
  }
}
