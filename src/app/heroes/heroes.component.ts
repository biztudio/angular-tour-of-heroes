import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  // CSS 元素选择器 app-heroes 用来在"父组件"的模板中匹配 HTML 元素的名称，以识别出该组件。
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes: Hero[];

  constructor() { }

  // 一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit()。
  // 这里是放置初始化逻辑的好地方。
  ngOnInit(): void {
    this.heroes = HEROES;
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
