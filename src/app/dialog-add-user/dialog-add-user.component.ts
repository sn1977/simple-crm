import {Component} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {UserClass} from '../../models/user.class';
import {FormsModule} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
    selector: 'app-dialog-add-user',
    standalone: true,
    imports: [
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        FormsModule
     ],
    templateUrl: './dialog-add-user.component.html',
    styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
    user: UserClass = new UserClass();
    birthDate: Date | undefined;

    constructor(private firestore: AngularFirestore) {
    }

    saveUser() {
        // @ts-ignore
        this.user.birthDate = this.birthDate.getTime();
        console.log('Current user is:', this.user);

        this.firestore
            .collection('users')
            .add(this.user.toJSON())
            .then((result: any)=> {
            console.log('Adding user finished', result);
        });
    }
}
