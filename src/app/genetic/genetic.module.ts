import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { GeneticComponent } from './genetic.component';

@NgModule({
  declarations: [
    GeneticComponent
  ],
  providers: [],
  imports: [ FormsModule, BrowserModule ]
})
export class GeneticModule { }
export { GeneticComponent }