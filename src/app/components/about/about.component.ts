import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public titol: string = "Projecte Angular v8"
  public subtitol: string = "UF3 M6 - Desenvolupament web entorn client"
  public mail: string = "eric.roca.2078@lacetania.cat"

  constructor() { }

  ngOnInit(): void {
  }

}
