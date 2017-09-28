import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingsComponent } from './user/settings/settings.component';
import { ArticleService } from './common/services/article.service';
import { HttpModule } from '@angular/http';
import { ViewArticleComponent } from './articles/view-article/view-article.component';
import { MembersComponent } from './members/members.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './common/services/user.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './common/services/auth.service';
import { NavigationComponent } from './common/navigation/navigation.component';
import { CapitalizePipe } from './common/pipes/capitalize.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/new', component: CreateArticleComponent },
  { path: 'articles/:id', component: ViewArticleComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'members', component: MembersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesComponent,
    CreateArticleComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    ViewArticleComponent,
    MembersComponent,
    NavigationComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'blog',
      storageType: 'localStorage'
    }),
    AuthModule
  ],
  providers: [ArticleService, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
