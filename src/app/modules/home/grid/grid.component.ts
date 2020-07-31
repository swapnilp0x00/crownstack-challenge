import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GridType } from '../home.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() list: Array<any>;
  @Input() gridType: GridType;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  loadSubcategory(item: { name: string }): void {
    if (this.gridType === GridType.Category) {
      this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { category: item.name } });
    }
  }
}
