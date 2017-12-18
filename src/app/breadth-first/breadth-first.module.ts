import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BreadthFirstComponent } from './breadth-first.component';

@NgModule({
  declarations: [
    BreadthFirstComponent
  ],
  providers: [],
  imports: [ FormsModule, BrowserModule ]
})
export class BreadthFirstModule { }
export { BreadthFirstComponent }