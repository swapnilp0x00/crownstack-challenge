import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  @Input() index;
  @Input() name: string;
  @Input() image: string;
  constructor() { }

  ngOnInit(): void {
  }

}
