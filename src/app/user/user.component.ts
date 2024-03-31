import {Component, inject, OnDestroy} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogAddUserComponent} from '../dialog-add-user/dialog-add-user.component';
import {UserClass} from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import {collection, Firestore, onSnapshot} from '@angular/fire/firestore';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        MatIcon,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatCardModule,
        NgForOf,
        RouterLink
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {

    user: UserClass = new UserClass();
    allUsers: UserClass[] = [];
    firestore: Firestore = inject(Firestore);
    unsubList;
    usersCollection = collection(this.firestore, 'users');
    // unsubDoc;

    constructor(public dialog: MatDialog) {

        this.unsubList = onSnapshot(this.usersCollection, (snapshot) => {
            this.allUsers = snapshot.docs.map(doc => doc.data() as UserClass);
            console.log(this.allUsers);
        });
    }

    ngOnDestroy() {
        this.unsubList();
    }

    openDialog() {
        this.dialog.open(DialogAddUserComponent);
    }
}
