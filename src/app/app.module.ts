import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneticComponent, GeneticModule } from './genetic/genetic.module';

import { AppComponent } from './app.component';


const appRoutes: Routes = [
  { path: 'genetic', component: GeneticComponent },
  { path: '**', redirectTo: '/genetic' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GeneticModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
