import { Component, OnInit, Input } from '@angular/core';
import { GridType } from '../home.component';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  @Input() index: number;
  @Input() name: string;
  @Input() image: string;
  @Input() gridType: GridType;
  constructor() { }

  ngOnInit(): void {
    if (this.gridType === GridType.Category) {
      this.image = '../../../../assets/category/' + this.image;
    }else if (this.gridType === GridType.Subcategory) {
      this.image = '../../../../assets/category/subcategory/' + this.image;
    }
  }

}
