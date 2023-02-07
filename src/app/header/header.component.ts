import { Component } from "@angular/core";

import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    // @Output('navTo') tab = new EventEmitter<string>();
    
    constructor(private dsService: DataStorageService) { }

    tabsNav(section: string) {
        // this.tab.emit(section);  
    }

    onSaveData() {
        this.dsService.storeRecipes();
    }

    onFetchData() {
        this.dsService.fetchRecipes().subscribe();
    }
}