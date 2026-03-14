import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { Dashboard } from './component/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar,Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
