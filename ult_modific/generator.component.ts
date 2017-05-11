import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Post, Datos, Varios} from './post.interface';

@Component({
    selector: 'generator',
    template: `<table class="table table-striped">
                    <thead><tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr></thead>
                    <tbody>
                    
                    <tr *ngFor="let post of datos | sortBy : 'id'">
                        
                        <td>{{post.id}}</td>
                        <td>{{post.datos?.title}}</td>
                        <td>{{post.datos?.category}}</td>
                        <td><button type="button" class="btn btn-warning" (click)="alform(post)" >Añadir</button>
                        <button type="button" class="btn btn-warning" (click)="delet(post)">Eliminar</button></td>
                        
                    </tr>
                    </tbody>
                </table>
                <hr>
               
                <div class="panel-group">
                <div class="panel panel-default">
                <my-collap nombre="Articulos">

                    <div class="panel-body">
                    <div class="panel panel-default">

                    <my-collap nombre="datos">

                        <div class="panel-body">
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Titulo: </label>     
                        <div class="col-sm-3"><input class="form-control" [(ngModel)]="title" /></div>
                        </div>
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Categoria: </label>  
                        <div class="col-sm-3"><input class="form-control" [(ngModel)]="category" /></div>
                        </div>
                        </div>
                    </my-collap>
                    </div>
                    {{datos}}
                    <div class="panel panel-default">

                    <my-collap nombre="varios">
                            
                        <div class="panel-body">
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Estado: </label>   
                        <div class="col-sm-3">
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck(true)" [checked]="estado" value=true />Disponible</label>
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck(false)" [checked]="!estado" value=false />agotado</label>
                        </div>
                        </div>
                        </div>
                        {{estado}}
                            <div *ngIf="datos">
                        {{datos[0].datos?.title}}
                            </div>
                        {{title}}
                    </my-collap>
                    </div>
                    </div>
                </my-collap>
               
               <button type="button" class="btn btn-warning" (click)="addb()">Añadir</button>
               <button type="button" class="btn btn-warning" (click)="modificar(post)">Modificar</button>
            </div>
            </div>
`,
})


export class Generator {
    @Input() datos: Post[];
    @Input() url: String;
    @Input() id: number;
    @Input() title: string;
    @Input() category: string;
    @Input() estado: boolean = true;
    @Output() oForm = new EventEmitter();
    @Output() oDel = new EventEmitter();
    @Output() oAdd = new EventEmitter();
    @Output() oMod = new EventEmitter();

    alform(post)
    {
        this.oForm.emit(post)
    }

    delet(post)
    {
        this.oDel.emit(post.id)

    }

    addb()
    {
        this.oAdd.emit()

    }
    modificar(post)
    {
        this.oMod.emit(post)

    }
}
