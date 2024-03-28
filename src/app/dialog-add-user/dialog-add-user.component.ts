import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {UserClass} from '../../models/user.class';
import {FormsModule} from '@angular/forms';
import {Firestore, collection, addDoc} from '@angular/fire/firestore';
import {MatButton} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-dialog-add-user',
    standalone: true,
    imports: [
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        FormsModule,
        MatButton,
        MatProgressBarModule,
        NgIf
    ],
    templateUrl: './dialog-add-user.component.html',
    styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
    user: UserClass = new UserClass();
    birthDate!: Date;
    loading = false;

    firestore: Firestore = inject(Firestore);

    constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    }


    async saveUser() {
        this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
        console.log('Current user is:', this.user);
        this.loading = true;

        await addDoc(collection(this.firestore, 'users'), this.user.toJSON()).catch(
            (err: any) => {
                console.error(err)
            }
        ).then(
            () => {
                console.log('Adding user finished:', this.user.firstName);
                this.dialogRef.close();
                this.loading = false;
            })
    }
}
