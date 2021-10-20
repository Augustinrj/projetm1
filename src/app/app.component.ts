import { Component, ViewEncapsulation, Input } from '@angular/core';
import * as Diagram from './diagram/diagram.component';
import * as go from 'gojs';
import { DataSyncService } from 'gojs-angular';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Angular';
  //public diagram =null;
}

