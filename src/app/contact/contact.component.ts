import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="contact-container">
      <!-- Header Section -->
      <div class="page-header" [style.background-image]="'url(' + backgroundImage + ')'">
        <div class="header-content">
          <h1 class="page-title">Contact Me</h1>
          <p class="page-subtitle">Have questions? I have answers.</p>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="content-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
              
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
                <div class="control-group">
                  <div class="form-group floating-label-form-group controls">
                    <label>Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      placeholder="Name" 
                      formControlName="name"
                      [class.is-invalid]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
                    <p class="help-block text-danger" 
                       *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
                      Please enter your name.
                    </p>
                  </div>
                </div>
                
                <div class="control-group">
                  <div class="form-group floating-label-form-group controls">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      placeholder="Email Address" 
                      formControlName="email"
                      [class.is-invalid]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                    <p class="help-block text-danger" 
                       *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                      Please enter a valid email address.
                    </p>
                  </div>
                </div>
                
                <div class="control-group">
                  <div class="form-group floating-label-form-group controls">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      placeholder="Phone Number" 
                      formControlName="phone"
                      [class.is-invalid]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched">
                    <p class="help-block text-danger" 
                       *ngIf="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched">
                      Please enter your phone number.
                    </p>
                  </div>
                </div>
                
                <div class="control-group">
                  <div class="form-group floating-label-form-group controls">
                    <label>Message</label>
                    <textarea 
                      rows="5" 
                      class="form-control" 
                      placeholder="Message" 
                      formControlName="message"
                      [class.is-invalid]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                    </textarea>
                    <p class="help-block text-danger" 
                       *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                      Please enter a message.
                    </p>
                  </div>
                </div>
                
                <br>
                <div id="success" *ngIf="submitted && contactForm.valid" class="alert alert-success">
                  Your message has been sent successfully!
                </div>
                
                <div class="form-group">
                  <button 
                    type="submit" 
                    class="btn btn-primary" 
                    [disabled]="isSubmitting">
                    {{ isSubmitting ? 'Sending...' : 'Send' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  backgroundImage = '/assets/img/contact-bg.jpg';
  contactForm: FormGroup;
  submitted = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        // Reset form after successful submission
        // this.contactForm.reset();
        // this.submitted = false;
      }, 2000);
    }
  }
}