import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './new-user/new-user.component';
import React from 'react';
import { redirect } from 'react-router-dom';
import { HomepageComponent } from './homepage/homepage.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { ServicessComponent } from './servicess/servicess.component';
import { AgendasComponent } from './agendas/agendas.component';
import { ProvedoresComponent } from './provedores/provedores.component';
import { InventarioComponent } from './inventario/inventario.component';


export const routes: Routes = [
  {
    path: 'buscar',
    component: HomeComponent
  },
  {
    path: 'labs',
    component: LabsComponent
  },
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'sing-up',
    component: NewUserComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'tra',
    component: TrabajadoresComponent
  },
  {
    path: 'contact',
    redirectTo: 'https://10web-site.ai/74/useful-bear/contact/',
    pathMatch: 'full'
  },
  {
    path: 'servicess',
    component:ServicessComponent
  },
  {
    path: 'agenda',
    component: AgendasComponent
  },
  {
    path: 'pro',
    component: ProvedoresComponent
  },
  {
    path: 'inventario',
    component: InventarioComponent
  }
];
