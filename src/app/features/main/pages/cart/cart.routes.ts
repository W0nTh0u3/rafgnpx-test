import { Routes } from "@angular/router";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { SuccessPageComponent } from "./success-page/success-page.component";

export const CART_ROUTES: Routes = [
    {
        path: '',
        component: CartPageComponent
    },
    {
        path: 'success',
        component: SuccessPageComponent
    }
];