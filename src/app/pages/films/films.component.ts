import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('FILMS')
  }
}
