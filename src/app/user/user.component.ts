import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogAddUserComponent} from '../dialog-add-user/dialog-add-user.component';
import {UserClass} from '../../models/user.class';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        MatIcon,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {

    user: UserClass = new UserClass();

    protected readonly top = top;

    constructor(public dialog: MatDialog) {
    }

    openDialog() {
        this.dialog.open(DialogAddUserComponent);
    }
}
