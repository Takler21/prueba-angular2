import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DataService } from "app/shared/data.service";
import { Observable } from "rxjs";

import { Project } from "app/models/project-info";
import { CardList } from "app/models/cardlist-info";
import { Card } from "app/models/card-info";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'The Kanban Board';
    projects: Project[];
    cardlists: CardList[];
    projectSelected: Project;
    projectname;
    cardlistname: string;
    cardlistcolor: string;
    cardlistorder: number;
    toShowAddProject: boolean;
    toShowAddCardList: boolean;
    classrow: string;
    downloadJsonHref;
    somthing;

    constructor(private dataService: DataService,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.dataService.getProjects()
            .subscribe(data => {
                this.projects = data;
                //Estoy filtrando segun el projecto inicial.
                this.projectSelected = this.projects[0];
                this.dataService.projectExp = this.projectSelected;
                //console.log(firstProject);
                // this.addAddCardList(
                //     'Done', 
                //     firstProject.$key,
                //     'green'
                // );
                this.filterCardLists();

            });
        //Mirar como influyen.
        this.dataService.getCards();
        this.dataService.getTasks();
        //this.addProject("TestProject1");
    }
    //Valorar si iria mejor en el servicio.
    generateDownloadJsonUri() {
        this.dataService.setJsonExport();
        var theJSON = this.dataService.resJsonResponse;
        var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        this.downloadJsonHref = uri;
    }

    addProject(name: string) {
        let created_at = new Date().toString();
        let newProject: Project = new Project();
        newProject.name = name;
        newProject.created_at = created_at;
        this.dataService.addProject(newProject);
    }

    addCardList(
        name: string,
        projectId: string,
        color: string,
        order: number) {
        let created_at = new Date().toString();
        let newCardList: CardList = new CardList();
        newCardList.name = name;
        newCardList.projectId = projectId;
        newCardList.color = color;
        newCardList.order = order;
        newCardList.created_at = created_at;
        this.dataService.addCardList(newCardList);
    }

    saveAddProject() {
        this.addProject(this.projectname);
        this.toShowAddProject = false;
    }

    saveAddCardList() {
        this.cardlists.forEach(cardlist => {
            if (cardlist.order >= this.cardlistorder)
                this.dataService.updateCardList(cardlist.$key, { order: cardlist.order + 1 })
        })
        this.addCardList(this.cardlistname, this.projectSelected.$key,
            this.cardlistcolor, this.cardlistorder);
        this.toShowAddCardList = false;
    }

    filterCardLists() {
        this.dataService.getCardLists()
            .subscribe(c => {
                this.cardlists = c;
                this.cardlists = this.cardlists.filter(cardlist => cardlist.projectId == this.projectSelected.$key);
                this.classrow = 'col-sm-' + Math.floor(12 / this.cardlists.length);
                //this.dataService.resJsonResponse = JSON.stringify({ "cardlist":  c});
                //console.log(this.dataService.resJsonResponse);
            })
            ;
    }

    showAddProject() {
        this.projectname = '';
        this.toShowAddProject = true;
    }

    cancelAddProject() {
        this.toShowAddProject = false;
    }

    showAddCardList() {
        this.cardlistname = '';
        this.cardlistcolor = '';
        this.cardlistorder = null;
        this.toShowAddCardList = true;
    }

    cancelAddCardList() {
        this.toShowAddCardList = false;
    }

    onChange(val) {
        this.projectSelected = val;
        this.filterCardLists();
    }

}
