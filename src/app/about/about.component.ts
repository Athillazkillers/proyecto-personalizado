import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <!-- Header Section -->
      <div class="page-header" [style.background-image]="'url(' + backgroundImage + ')'">
        <div class="header-content">
          <h1 class="page-title">About Me</h1>
          <p class="page-subtitle">This is what I do.</p>
        </div>
      </div>

      <!-- Content Section -->
      <div class="content-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed quisquam ut perspiciatis, repudiandae nulla animi iste vel, praesentium repellendus molestias aliquid consequatur, earum rem qui error voluptates eius enim consequuntur!</p>
              
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex alias, earum consectetur quia natus ducimus voluptate explicabo, hic porro reprehenderit, quasi? Tenetur ipsum distinctio laboriosam perspiciatis officiis dolore, architecto id.</p>
              
              <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam inventore aspernatur repellendus incidunt adipisci modi voluptates recusandae iste eligendi, repudiandae corporis quod aut, optio! Explicabo quaerat unde voluptatem! Itaque, eum!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  backgroundImage = '/assets/img/about-bg.jpg';
}