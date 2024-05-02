import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from 'src/app/app.component';
import { PostFormComponent } from 'src/app/post-form/post-form.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostItemComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
