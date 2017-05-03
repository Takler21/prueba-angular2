import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { NgFor, NgIf}         from '@angular/common';
import {AppServices} from './search.service';
import {Post} from './post.interface';


@Component({
    selector: 'my-app',
    template: `
            
          <div class="container" id="main">
           <div class="center-block">    
               <div id = "header"></div>
               <div id = "content">
               
                 <h1>Gestor JSON Angular 2</h1>
                <label for="sel">Seleccione un titulo</label>
                <table>
                    <tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr>
                    <tr *ngFor="let post of datos">
                        <td>{{post.id}}</td>
                        <td><input class="form-control form-control-lg" [(ngModel)]="post.title" /></td>
                        <td><input class="form-control form-control-lg" [(ngModel)]="post.category" /></td>
                        <td><button type="button" class="btn btn-warning" (click)="alform(post)" >Añadir</button>
                            <button type="button" class="btn btn-warning" (click)="modificar(post)">Modificar</button>
                            <button type="button" class="btn btn-warning" (click)="delet(post)">Eliminar</button></td>
                    </tr>
                    
                </table>

                <hr>
                <my-collap nombre="Articulos">
                
                   <div class="form-group row"> 
                   <label class="col-sm-1 col-form-label">Titulo: </label>   <div class="col-sm-3"><input class="form-control" [(ngModel)]="title" /></div>
                   </div>
                   <div class="form-group row"> 
                   <label class="col-sm-1 col-form-label">Categoria: </label>  <div class="col-sm-3"><input class="form-control" [(ngModel)]="category" /></div>
                </div>
                </my-collap>
               
               <button type="button" class="btn btn-warning" (click)="addb()">Añadir</button>
            </div>
            </div>
          </div>
  		 `,
    providers: [AppServices],

})
//En lugar de cargar en el select podriamos cargar en eun array y de este mostar en el select.
export class AppComponent implements OnInit {
    @Input() datos: Post[];
    errorMessage: any;
    id: number;
    title: string;
    category: string;
    verd = true;
    constructor(public appservice: AppServices) {
    }
    ngOnInit() {
        this.appservice.getJSON().subscribe(res =>
            this.datos = res);
    }

    redirect(){
        
    }

    addb() {
        let obj: Post;
        //let idp = 0;

       // for (let i = 0; i < this.datos.length; i++) {
       //     if (this.datos[i].id !== (i + 1))
       //         idp = this.datos[i].id
       // }
       // if (idp === 0)
       //     idp = this.datos.length;
        obj = {title: this.title, category: this.category };
            this.appservice.add(obj).subscribe(
                per => this.datos.push(per),
                error => this.errorMessage = <any>error); 
            this.ngOnInit();
    }

    alform(post)
    {
        this.title = post.title;
        this.category = post.category;
        this.id = post.id;
    }

    modificar(post) {
        let obj: Post;
        obj = { id: post.id, title: post.title, category: post.category };
        this.appservice.update(obj).subscribe();
        this.ngOnInit();
    }

    delet(post) {
        this.appservice.delete(post.id).subscribe();
        this.ngOnInit();
    }

    logs: string[] = [];

    log(message) {
        this.logs.push(message);


    }
}
