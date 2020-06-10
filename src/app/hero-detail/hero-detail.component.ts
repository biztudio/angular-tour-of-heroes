import { Component, OnInit, Input } from '@angular/core';

// 组件支持参数路由需要导入 ActivatedRoute / Location (服务), 并注入组件
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
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

  constructor(
    // ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。
    private route: ActivatedRoute,
    // location 是一个 Angular 的服务，用来与浏览器打交道。
    private location: Location,
    // 数据服务
    private heroService: HeroService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroAsync(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    // 通过 location 服务调用浏览器的回退
    this.location.back();
  }
}
