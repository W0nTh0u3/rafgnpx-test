import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";

export const LOGIN_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: '',
                component: LoginFormComponent
            },
            {
                path: 'register',
                component: RegisterFormComponent
            }
        ]
    },
];
