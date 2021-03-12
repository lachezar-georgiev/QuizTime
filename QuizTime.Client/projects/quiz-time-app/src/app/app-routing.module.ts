import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', component: HomeComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
