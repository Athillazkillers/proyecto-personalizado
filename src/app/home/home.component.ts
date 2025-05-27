import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Post {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  date: Date;
  background: string;
  excerpt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <div class="hero-section" [style.background-image]="'url(' + heroBackground + ')'">
        <div class="hero-content">
          <h1 class="hero-title">Clean Blog</h1>
          <p class="hero-subtitle">A Blog Theme by Start Bootstrap</p>
        </div>
      </div>

      <!-- Posts Section -->
      <div class="posts-section">
        <div class="container">
          <div class="post-preview" *ngFor="let post of posts">
            <a [routerLink]="'/post/' + post.id">
              <h2 class="post-title">{{ post.title }}</h2>
              <h3 class="post-subtitle" *ngIf="post.subtitle">{{ post.subtitle }}</h3>
            </a>
            <p class="post-meta">
              Posted by <span class="author">{{ post.author }}</span> on {{ post.date | date:'MMMM d, y' }}
            </p>
            <p class="post-excerpt">{{ post.excerpt }}</p>
          </div>
          
          <!-- Pagination -->
          <div class="pagination-section">
            <button class="btn btn-primary">Older Posts →</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  heroBackground = '/assets/img/home-bg.jpg';
  
  posts: Post[] = [
    {
      id: 1,
      title: 'Man must explore, and this is exploration at its greatest',
      subtitle: 'Problems look mighty small from 150 miles up',
      author: 'Start Bootstrap',
      date: new Date('2023-09-24'),
      background: '/assets/img/post-bg.jpg',
      excerpt: 'Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe...'
    },
    {
      id: 2,
      title: 'I believe every human has a finite number of heartbeats',
      subtitle: 'I don\'t intend to waste any of mine',
      author: 'Start Bootstrap',
      date: new Date('2023-09-18'),
      background: '/assets/img/post-bg.jpg',
      excerpt: 'Exercise is the key to life. Regular physical activity helps maintain good health and prevents many diseases...'
    },
    {
      id: 3,
      title: 'Science has not yet mastered prophecy',
      subtitle: 'We predict too much for the next year and yet far too little for the next ten',
      author: 'Start Bootstrap',
      date: new Date('2023-08-24'),
      background: '/assets/img/post-bg.jpg',
      excerpt: 'The future is unpredictable, and that\'s what makes it exciting. Technology advances at an unprecedented pace...'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization logic
  }
}
