import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[RouterOutlet],
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    window.scrollTo({
      left: document.body.scrollWidth,
      behavior: 'smooth' // Use 'smooth' para uma rolagem suave, ou 'auto' para uma rolagem instantânea
    });
  }


  title = 'belugaanalitycs.client';
}
