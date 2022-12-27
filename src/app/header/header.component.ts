import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    @Output('navTo') tab = new EventEmitter<string>();
    
    tabsNav(section: string) {
        this.tab.emit(section);  
    }
}