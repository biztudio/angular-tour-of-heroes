import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  // CSS 元素选择器 app-heroes 用来在"父组件"的模板中匹配 HTML 元素的名称，以识别出该组件。
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  // 1. 声明了一个私有 heroService 属性，
  // 2. 把它标记为一个 HeroService 的注入点。
  // 当 Angular 创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的"单例对象"。
  // 让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。
  // 构造函数不应该做任何事。 它当然不应该调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求。
  constructor(private heroService: HeroService) { }

  // 一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit()。
  // 这里是放置初始化逻辑的好地方。
  ngOnInit(): void {
    /*
    // HeroService.getHeroes() 的函数签名是同步的
    this.heroes = this.heroService.getHeroes();
     */

     // 通过订阅 ( subscribe ) 异步操作
    this.heroService.getHeroesAsync().subscribe(heroes => {
      this.heroes = heroes;
      console.log('fetched.');
    });
  }

}
