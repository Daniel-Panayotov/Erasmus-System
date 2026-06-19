import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAPI } from '../../services/student.api.service';
import { catchError, EMPTY, map, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private studentAPI = inject(StudentAPI);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  studentID: number = this.route.snapshot.params['studentID'];

  private _student = toSignal(
    this.studentAPI.GetStudent(this.studentID).pipe(
      take(1),
      catchError((err) => {
        this.router.navigateByUrl('/');
        return EMPTY;
      }),
      map((v) => v.body),
    ),
  );

  get student() {
    return computed(() => this._student());
  }
}
