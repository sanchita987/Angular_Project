import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { PostsComponent } from './posts/posts.component';
import { ArtistsComponent } from './artists/artists.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PostComponent } from './post/post.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceRegisterComponent } from './invoice-register/invoice-register.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'admin', 
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
           { path: 'books', component: BooksComponent },
            { path: 'news', component: PostsComponent },
            { path: 'news/:id', component: PostComponent },
            { path: 'artists', component: ArtistsComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'customer-register', component: CustomerRegisterComponent },
           { path: 'customer/:id/update', component: CustomerUpdateComponent },
            { path: 'user', component: UserComponent },
            { path: 'user-register', component: UserRegisterComponent },
            { path: 'user/:id', component: UserDetailComponent },
            { path: 'customer/:id', component: CustomerDetailComponent },
            { path: 'user/:id/update', component: UserUpdateComponent },
            { path: 'invoice', component: InvoiceComponent },
            { path: 'invoice-register', component: InvoiceRegisterComponent },
            { path: 'invoice/:id', component: InvoiceDetailComponent },
           
        ],
        canActivate: [authGuard]
    },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', component: PageNotFoundComponent }

];
