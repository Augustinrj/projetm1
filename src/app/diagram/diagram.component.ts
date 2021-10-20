import { Component, OnInit, ViewEncapsulation,Input,EventEmitter } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService } from 'gojs-angular';
import { Person } from '../Models/person';
import { PersonService } from '../Service/person.service';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class DiagramComponent implements OnInit {

 
  constructor(private personServive : PersonService) { 
    
  }
  
  ngOnInit(): void {
    
  }
  public test (){
    let i=0;
    this.personServive.getUser().toPromise().then((res) => {
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element['nom']);
      }
    }
      // console.log(donne[i]);
      // i++;
      
    );

    //console.log("test get " + JSON.stringify(data));
  }

  public testSave(){
    //this.personServive.login();
  }

  public ngAfterViewInit(){
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      model: $(go.GraphLinksModel,
        {
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.nodeTemplate =
      $(go.Node, 'Auto',
        {
          toLinkable: true, fromLinkable: true
        },
        $(go.Shape, 'RoundedRectangle', { stroke: null },
          new go.Binding('fill', 'color')
        ),
        $(go.TextBlock, { margin: 8 },
          new go.Binding('text', 'key'))
      );
  }

  

  @Input() public diagramNodeData: Array<{}> = [
    { key: 'Alpha', color: 'lightblue' },
    { key: 'Beta', color: 'orange' },
    { key: 'Gamma', color: 'lightgreen' },
    { key: 'Delta', color: 'pink' }
  ];
  @Input() public diagramLinkData: Array<{}>= [
    { key: -1, from: 'Alpha', to: 'Beta' },
    { key: -2, from: 'Alpha', to: 'Gamma' },
    { key: -3, from: 'Beta', to: 'Beta' },
    { key: -4, from: 'Gamma', to: 'Delta' },
    { key: -5, from: 'Delta', to: 'Alpha' }
  ];
  @Input() public diagramDivClassName: string = 'myDiagramDiv';
  @Input() public diagramModelData = {};
  @Input() public skipsDiagramUpdate = false;

  // When the diagram model changes, update app data to reflect those changes
  @Input() public diagramModelChange(changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  };    
}
  //@Input() public diagramNodeData : Array<{}> = [
  //   { key: 'Alpha', color: 'lightblue' },
  //   { key: 'Beta', color: 'orange' },
  //   { key: 'Gamma', color: 'lightgreen' },
  //   { key: 'Delta', color: 'pink' }
  // ];
//public initDiagram(): go.Diagram {

  //   const $ = go.GraphObject.make;
  //   const dia = $(go.Diagram, {
  //     'undoManager.isEnabled': true,
  //     model: $(go.GraphLinksModel,
  //       {
  //         linkKeyProperty: 'key'
  //       }
  //     )
  //   });
  //   dia.nodeTemplate =
  //     $(go.Node, 'Auto',
  //       {
  //         toLinkable: true, fromLinkable: true
  //       },
  //       $(go.Shape, 'RoundedRectangle', { stroke: null },
  //         new go.Binding('fill', 'color')
  //       ),
  //       $(go.TextBlock, { margin: 8 },
  //         new go.Binding('text', 'key'))
  //     );

  //   return dia;
  // }


  // @Input() public diagramLinkData :Array<{}> = [
  //   { key: -1, from: 'Alpha', to: 'Beta' },
  //   { key: -2, from: 'Alpha', to: 'Gamma' },
  //   { key: -3, from: 'Beta', to: 'Beta' },
  //   { key: -4, from: 'Gamma', to: 'Delta' },
  //   { key: -5, from: 'Delta', to: 'Alpha' }
  // ];

  // @Input() public skipsDiagramUpdate   = false;
  // @Input() public diagramDivClassName: string = 'myDiagramDiv';
  // @Input() public diagramModelData = {};
  // @Input() public diagramModelChange (changes: go.IncrementalData) {
  //   this.skipsDiagramUpdate = true;
  //   this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
  //   this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
  //   this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  // };