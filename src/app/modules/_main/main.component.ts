import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  my_menu = {
    'main1': ['sub1', 'sub2'],
    'main2': ['sub1', 'sub2'],
  }

  get keys() {
    return Object.keys(this.my_menu);
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) {

  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): Observable<Array<any>> {
    return this.appService.response$.pipe(
      map(res => res.data.locations),
      map(locations => locations.map(location => {
        return {
          dealers_id: location.dealers_id,
          name: location.name,
          branches: location.branches.map(branch => {
            return {
              branch_id: branch.branch_id, name: branch.name
            };
          })
        };
      })),
      tap(res => console.log(res))
    );
  }

}
