import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


export enum GridType {
  'Category' = 0,
  'Subcategory' = 1
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = [];
  filteredData = [];
  gridType = GridType.Category;
  category: {name: string};
  breadcrumb = [];
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

    this.activatedRoute.params.subscribe((params) => {
      this.applyFilters();
    });
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.applyFilters();
    });
  }


  applyFilters() {
    const snapshot = this.activatedRoute.snapshot;
    const {params, queryParams} = snapshot;
    this.gridType = GridType.Category;
    this.breadcrumb = ['Equipment Catalog'];
    let categories;
    // Dealers_ID
    if (params.dealers_id) {
      const location = this.data.find(loc => loc.dealers_id === params.dealers_id);
      const branches = location.branches;
      // Branch ID
      if (params.branch_id) {
        const branch = branches.find(item => item.branch_id === params.branch_id);
        categories = branch.categories;
      } else {
        categories = branches.reduce((acc, branch) => {
          acc = acc.concat(branch.categories);
          return acc;
        }, []);
      }

      if (queryParams.category) {
        const category = categories.find(item => item.name === queryParams.category);
        if (category) {
          this.breadcrumb.push(category.name);
          this.filteredData = category.subcategories || [];
          this.gridType = GridType.Subcategory;
        } else {
          this.filteredData = categories;
        }
      } else {
        this.filteredData = categories;
      }
    }
  }

}
