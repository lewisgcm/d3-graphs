import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DepthFirstComponent } from './depth-first.component';

@NgModule({
  declarations: [
    DepthFirstComponent
  ],
  providers: [],
  imports: [ FormsModule, BrowserModule ]
})
export class DepthFirstModule { }
export { DepthFirstComponent }