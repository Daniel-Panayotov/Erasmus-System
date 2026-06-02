import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Gender, ProfileFormModel } from '../../models/profile-form.models';

@Component({
  selector: 'app-profile-form',
  imports: [],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm {
  formModel = signal<ProfileFormModel>({
    firstname: '',
    lastname: '',
    birthday: new Date(),
    gender: Gender.Other,
    nationality: '',
    currentAddress: '',
    permanentAddress: '',
    phone: '',
  });

  applicationForm = form(this.formModel, (schemaPath) => {}, {
    submission: { action: async (detail) => {} },
  });
}
