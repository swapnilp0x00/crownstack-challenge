import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService) { }
  
  ngOnInit(): void {
    this.appService.fetchData().subscribe(res => {
      console.log(res);
    });
  }

}
