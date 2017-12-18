import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { BreadthFirstComponent, BreadthFirstModule } from "./breadth-first/breadth-first.module";
import { DepthFirstComponent, DepthFirstModule } from "./depth-first/depth-first.module";
import { GeneticComponent, GeneticModule } from './genetic/genetic.module';

import { AppComponent } from './app.component';


const appRoutes: Routes = [
  { path: 'genetic', component: GeneticComponent },
  { path: 'depth-first', component: DepthFirstComponent },
  { path: 'breadth-first', component: BreadthFirstComponent },
  { path: '**', redirectTo: '/genetic' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GeneticModule,
    BreadthFirstModule,
    DepthFirstModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }