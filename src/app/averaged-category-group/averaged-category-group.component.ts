import { Component, OnInit, Input } from '@angular/core';
import { AveragedCategoryGroup } from '../averaged-category';
import { Subdivision } from '../subdivision';

@Component({
  selector: 'app-averaged-category-group',
  templateUrl: './averaged-category-group.component.html',
  styleUrls: ['./averaged-category-group.component.css']
})
export class AveragedCategoryGroupComponent implements OnInit {

  @Input() categoryGroup: AveragedCategoryGroup;
  @Input() subdivision: Subdivision;

  constructor() { }

  ngOnInit() {
  }

}
