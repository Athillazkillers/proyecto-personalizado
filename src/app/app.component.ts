import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mi Proyecto Personalizado';
  heroTitle = 'Clean Blog Angular';
  heroSubtitle = 'Una plantilla moderna para Angular inspirada en Clean Blog';
  backgroundImage = 'assets/img/home-bg.jpg'; // Necesitarás agregar esta imagen
  
  isDarkTheme = false;
  isNavbarOpen = false;
  activeSection = 'home';
  currentDate = new Date();
  currentYear = new Date().getFullYear();
  
  contactForm: FormGroup;
  formSubmitted = false;
  isSubmitting = false;

  features: Feature[] = [
    {
      icon: 'fas fa-mobile-alt',
      title: 'Diseño Responsivo',
      description: 'Perfectamente adaptado a todos los dispositivos y tamaños de pantalla.'
    },
    {
      icon: 'fas fa-palette',
      title: 'Modo Oscuro/Claro',
      description: 'Cambia entre temas claro y oscuro según tu preferencia.'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Alto Rendimiento',
      description: 'Optimizado para cargar rápidamente y ofrecer una experiencia fluida.'
    },
    {
      icon: 'fas fa-code',
      title: 'Código Limpio',
      description: 'Desarrollado con las mejores prácticas de Angular y TypeScript.'
    }
  ];

  projects: Project[] = [
    {
      title: 'Proyecto Angular Clean Blog',
      description: 'Una aplicación web moderna que combina Angular con el diseño elegante de Clean Blog.',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Bootstrap'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Sistema de Gestión de Tareas',
      description: 'Una aplicación para gestionar tareas y proyectos con funcionalidades avanzadas.',
      technologies: ['Angular', 'Firebase', 'Material Design'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'E-commerce Responsive',
      description: 'Plataforma de comercio electrónico completamente responsiva y moderna.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Inicializar tema basado en preferencia del sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkTheme = prefersDarkScheme.matches;
    this.applyTheme();

    // Manejar cambio de tema del sistema
    prefersDarkScheme.addListener((e) => {
      this.isDarkTheme = e.matches;
      this.applyTheme();
    });

    // Smooth scrolling para enlaces internos
    this.setupSmoothScrolling();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.isDarkTheme ? 'dark' : 'light'
    );
    
    // Actualizar clase del body para Bootstrap
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.isNavbarOpen = false; // Cerrar navbar en mobile
    
    // Actualizar imagen de fondo según la sección
    switch (section) {
      case 'about':
        this.backgroundImage = 'assets/img/about-bg.jpg';
        break;
      case 'projects':
        this.backgroundImage = 'assets/img/projects-bg.jpg';
        break;
      case 'contact':
        this.backgroundImage = 'assets/img/contact-bg.jpg';
        break;
      default:
        this.backgroundImage = 'assets/img/home-bg.jpg';
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simular envío del formulario
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactForm.value);
        this.isSubmitting = false;
        
        // Resetear formulario después del envío exitoso
        setTimeout(() => {
          this.contactForm.reset();
          this.formSubmitted = false;
        }, 3000);
      }, 2000);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private setupSmoothScrolling(): void {
    // Escuchar clicks en enlaces internos para scroll suave
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    });
  }

  // Método para cambiar dinámicamente el fondo del header
  changeBackgroundImage(imageUrl: string): void {
    this.backgroundImage = imageUrl;
  }

  // Método para añadir nuevos proyectos
  addProject(project: Project): void {
    this.projects.push(project);
  }

  // Método para obtener el estado del formulario
  get isFormValid(): boolean {
    return this.contactForm.valid;
  }

  // Método para obtener errores específicos del formulario
  getFieldError(fieldName: string): string | null {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} es requerido.`;
      }
      if (field.errors['email']) {
        return 'Ingresa un email válido.';
      }
      if (field.errors['minlength']) {
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }
}