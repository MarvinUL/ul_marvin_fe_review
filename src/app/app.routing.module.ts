import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectFormComponent } from './create-project-form/create-project-form.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

const routes: Routes = [
  { path: '', component:  ProjectsListComponent},
  {path: 'create', component: CreateProjectFormComponent}
];

// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// { path: 'dashboard', component: DashboardComponent },
// { path: 'detail/:id', component: HeroDetailComponent },
// { path: 'heroes', component: HeroesComponent }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }