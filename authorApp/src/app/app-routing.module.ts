import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'edit', component: EditComponent },
  { path: 'show', component: ShowComponent },
  { path: '', pathMatch: 'full', redirectTo: '/show' },
  { path: 'edit/:id/:authorname', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
