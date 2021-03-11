import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'results', component: ResultComponent },
  { path: '**', component: HomeComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
