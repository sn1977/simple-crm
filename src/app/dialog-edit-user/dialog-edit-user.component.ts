import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {UserClass} from '../../models/user.class';
import {Firestore} from '@angular/fire/firestore';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
    imports: [
        MatDialogTitle,
        MatProgressBar,
        NgIf,
        MatDialogContent,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton,
        MatDialogActions,
        FormsModule,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix
    ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
    user: UserClass = new UserClass();
    loading = false;
    birthDate!: Date;

    firestore: Firestore = inject(Firestore);

    constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    }

    async saveUser() {
        this.loading = true;
    }

}
