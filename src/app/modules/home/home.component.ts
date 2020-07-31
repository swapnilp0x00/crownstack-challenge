import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, tap, map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = [];
  filteredData = [];
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.appService.response$.pipe(
      map(response => response.data.locations)
    ).subscribe(data => {
      this.data = data;
    });

    this.activatedRoute.params.subscribe(({ dealers_id, branch_id}) => {
      console.log(dealers_id, branch_id);
      this.applyFilters({
        dealers_id,
        branch_id,
      });
    });
  }


  applyFilters(filter: { dealers_id: string, branch_id: string }) {
    // Dealers_ID
    if (filter.dealers_id) {
      const location = this.data.find(location => location.dealers_id === filter.dealers_id);
      const branches = location.branches;
      // Branch ID
      if (filter.branch_id) {
        const branch = branches.find(branch => branch.branch_id === filter.branch_id);
        this.filteredData = branch.categories;
      } else {
        this.filteredData = branches.reduce((acc, branch) => {
          acc = acc.concat(branch.categories);
          return acc;
        }, []);
      }

      const snapshot = this.activatedRoute.snapshot;
    }

    console.log(this.filteredData);
  }

}
