import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarComponent, CommonModule, MatIconModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  open = false

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (typeof window !== 'undefined'){
      // Remove and add scrollbar on sidebar toggle and window resize
      let windowWidth = (event.target as Window).innerWidth
      const tagName = document.getElementsByTagName('html')[0]
      windowWidth > 768 ? tagName.style.overflow = 'auto' : ''
      windowWidth < 768 && this.open ? tagName.style.overflow = 'hidden' : tagName.style.overflow = 'auto'
    }
  }

  toggleSidebar = () => {
    this.open = !this.open
    if (typeof window !== 'undefined'){
      // Remove and add scrollbar on sidebar toggle
      const tagName = document.getElementsByTagName('html')[0]
      tagName && this.open ? tagName.style.overflow = 'hidden' : tagName.style.overflow = 'auto'
    }
  }
}
