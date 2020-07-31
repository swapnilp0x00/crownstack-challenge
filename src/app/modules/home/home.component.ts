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
  data = [];   // store original items.
  filteredData: Array<{ name: string, image: string }> = []; // store filtered items based on filters applied. derived from data array.
  gridType = GridType.Category; // type of grid. category / subcategory.
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

  /**
   * applyFilters - whenever route parameters or query parameter changes, call apply filters to apply new filters.
   */
  applyFilters(): void {
    const snapshot = this.activatedRoute.snapshot;
    const { params, queryParams } = snapshot;
    this.gridType = GridType.Category;
    this.breadcrumb = ['Equipment Catalog'];
    let categories;
    // Dealers_ID
    if (params.dealers_id) {
      const branches = this.getBranchesByDealerId(this.data, params.dealers_id);
      // Branch ID
      categories = this.getCategoriesByBranchId(branches, params.branch_id);

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

  /**
   *
   * @param data - Data to be filtered
   * @param dealers_id - dealers id to filter oit branches
   */
  getBranchesByDealerId(data: { dealers_id: string, branches: any }[] = [], dealers_id: string): Array<any> {
    let branches = [];
    const location = data.find(loc => loc.dealers_id === dealers_id);
    branches = location.branches;
    return branches;
  }

  /**
   * 
   * @param branches
   * @param branch_id
   */
  getCategoriesByBranchId(branches, branch_id: string): Array<any> {
    let categories = [];
    if (branch_id) {
      const branch = branches.find(item => item.branch_id === branch_id);
      categories = branch.categories;
    } else {
      categories = branches.reduce((acc, branch) => {
        acc = acc.concat(branch.categories);
        return acc;
      }, []);
    }
    return categories;
  }
}
