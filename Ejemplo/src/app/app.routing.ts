import {ModuleWithProviders} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//COMPONENTS
import { HomeComponent } from "./components/home/home.component";
import { RegistrarComponent } from "./components/registrar/registrar.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from './components/perfil/perfil.component';
import { EncuestasComponent } from './components/encuestas/encuestas.component';

const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'registrar', component: RegistrarComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'encuestas', component: EncuestasComponent},
    {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes)