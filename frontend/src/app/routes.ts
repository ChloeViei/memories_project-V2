import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import {MemoryComponent} from './memory/memory.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
      path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
    },
    {
      path: 'memories', component: MemoryComponent, canActivate: [AuthGuard]
    }
];
