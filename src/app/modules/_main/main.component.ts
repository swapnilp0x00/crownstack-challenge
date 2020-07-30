import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AppService } from '../../app.service';
import { MatMenuItem } from '@angular/material/menu';

type MenuItem = {
  name: string, dealers_id: string,
  branches: { branch_id: string, name: string }[]
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuItems: MenuItem[];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) {

  }

  ngOnInit() {
    this.getMenu().subscribe((response: MenuItem[]) => {
      this.menuItems = response;
    });
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
      })
      )
    );
  }


  setFilter(filter) {
    console.log(filter);
  }

}
