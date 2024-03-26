import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet,
        MatToolbarModule,
        MatIcon,
        MatSidenavModule,
        MatIconModule,
        RouterLink,
        MatInputModule,
        MatFormFieldModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'simple-crm';
}
