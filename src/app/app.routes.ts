import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { PostsComponent } from './posts/posts.component';
import { ArtistsComponent } from './artists/artists.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PostComponent } from './post/post.component';
import { MapComponent } from './map/map.component';

 
export const routes: Routes = [
    { path: '',   redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'forgot-password', component:ForgotPasswordComponent },
    
    {path: 'books', component: BooksComponent },
    {path: 'news', component: PostsComponent},
    {path: 'news/:id', component: PostComponent},
    {path: 'artists', component: ArtistsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'map', component: MapComponent},
    { path: '**', component: PageNotFoundComponent },
   
];
 