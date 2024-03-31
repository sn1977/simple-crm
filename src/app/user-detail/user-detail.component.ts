import {Component, inject, OnDestroy} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ActivatedRoute} from '@angular/router';
import {Firestore, onSnapshot, doc, Unsubscribe} from '@angular/fire/firestore';
import {UserClass} from '../../models/user.class';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {DialogEditAddressComponent} from '../dialog-edit-address/dialog-edit-address.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogEditUserComponent} from '../dialog-edit-user/dialog-edit-user.component';

@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIcon,
        MatIconButton,
        MatMenuModule,
        MatDialogModule
    ],
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

    userId: string | null = '';
    // userDetail: UserClass | undefined; // Benutzerobjekt
    userDetail = new UserClass();
    unsubList!: Unsubscribe;

    firestore: Firestore = inject(Firestore);

    constructor(private route: ActivatedRoute, public dialog: MatDialog) {
        this.userId = this.route.snapshot.paramMap.get('id');
        console.log('got it', this.userId);
        this.getUser();
    }
    ngOnDestroy() {
        this.unsubList();
    }

    getUser() {
        if (this.userId) {
            // Erhalte eine Referenz zum User-Dokument basierend auf der userId
            const userRef = doc(this.firestore, 'users', this.userId);

            const unsub = onSnapshot(userRef, (docSnapshot) => {
                console.log('User data:', docSnapshot.data());
                this.userDetail = {...docSnapshot.data(), docId: docSnapshot.id} as UserClass;
            });
            this.unsubList = unsub;
        }
    }

    editUserDetail() {
        // const dialog = this.dialog.open(DialogEditUserComponent);
        // // dialog.componentInstance.user = new UserClass(this.userDetail.toJSON());
        // dialog.componentInstance.user = this.userDetail;

        const dialog = this.dialog.open(DialogEditUserComponent);
        // Erstelle eine Kopie von userDetail, bevor du es an den Dialog übergibst
        dialog.componentInstance.user = new UserClass({ ...this.userDetail });
        dialog.afterClosed().subscribe((result) => {
            // Optional: Übernimm die Änderungen, wenn der Dialog erfolgreich geschlossen wurde
            if (result) {
                this.userDetail = result;
            }
        });
        // dialog.componentInstance.user = this.userId; // Stelle sicher, dass DialogEditAddressComponent eine userId Eigenschaft hat
    }

    editMenu() {
        // const dialog = this.dialog.open(DialogEditAddressComponent);
        // // dialog.componentInstance.user = new UserClass(this.userDetail.toJSON());
        // dialog.componentInstance.user = this.userDetail;
        const dialog = this.dialog.open(DialogEditAddressComponent);

        dialog.componentInstance.user = new UserClass({ ...this.userDetail });
        dialog.afterClosed().subscribe((result) => {
            // Optional: Übernimm die Änderungen, wenn der Dialog erfolgreich geschlossen wurde
            if (result) {
                this.userDetail = result;
            }
        });
    }
}
