import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserClass} from '../../models/user.class';
import {addDoc, collection, doc, Firestore, updateDoc} from '@angular/fire/firestore';

@Component({
    selector: 'app-dialog-edit-address',
    standalone: true,
    imports: [
        MatButton,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        MatProgressBar,
        MatSuffix,
        NgIf,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './dialog-edit-address.component.html',
    styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
    user: UserClass = new UserClass();
    loading = false;
    userId?: string;

    firestore: Firestore = inject(Firestore);

    constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
    }

    async saveUser() {
        this.loading = true;

        // Stelle sicher, dass userId vorhanden ist
        if (!this.userId) {
            console.error("No userId provided");
            return;
        }

        const userRef = doc(this.firestore, 'users', this.userId); // Erhalte die Dokument-Referenz

        try {
            await updateDoc(userRef, this.user.toJSON()); // Aktualisiere das existierende Dokument
            console.log('User updated successfully');
        } catch (err) {
            console.error('Error updating user:', err);
        } finally {
            this.dialogRef.close(); // Schließe den Dialog
            this.loading = false;
        }
    }
}
