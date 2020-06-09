import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // @Input() 装饰器
  // 外部的组件将会绑定到它, 这是一种单向数据绑定。
  // 形如: <app-hero-detail [hero]="selectedHero" > </app-hero-detail>
  // 类似 Vue / React 的 props
  @Input() hero: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
