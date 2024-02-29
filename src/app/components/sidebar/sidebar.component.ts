import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent{
  @Output() toggleSidebar = new EventEmitter<boolean>()

  sidebarToggle = () => this.toggleSidebar.emit(false)
}
