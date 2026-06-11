import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApplicationData } from '../models/application.form.models';

@Service()
export class ApplicationAPI {
  private http = inject(HttpClient);

  public GetApplications(studentID: number) {
    const url = `applications/get-all?studentID=${studentID}`;

    return this.http.get(url, { observe: 'response', credentials: 'include' });
  }

  public CreateApplication(data: ApplicationData) {
    const url = `applications/create`;

    const formData = new FormData();

    formData.append('photo', data.photo, data.photo.name);
    formData.append('mobilityType', data.mobilityType);
    formData.append('studyFrom', data.studyFrom.toDateString());
    formData.append('studyTo', data.studyTo.toDateString());
    formData.append('accommodation', `${data.accommodation}`);
    formData.append('accommodationFrom', data.accommodationFrom?.toDateString() ?? '');
    formData.append('accommodationTo', data.accommodationTo?.toDateString() ?? '');
    formData.append('bulgarianCourse', `${data.bulgarianCourse}`);
    formData.append('motivationText', data.motivationText);
    formData.append('degree', data.degree);
    formData.append('priorStudyAbroad', `${data.priorStudyAbroad}`);
    formData.append('priorStudyDuration', `${data.priorStudyDuration ?? 0}`);

    return this.http.post(url, formData, { observe: 'response', credentials: 'include' });
  }
}
