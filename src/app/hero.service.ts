import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';


// @Injectable() 装饰器。 它把这个类标记为依赖注入系统的参与者之一。
// 在 @Injectable 元数据中注册该提供者，还能允许 Angular 通过移除那些完全没有用过的服务来进行优化。
@Injectable({
  // 必须先注册一个服务提供者，来让 HeroService 在依赖注入系统中可用.
  // 所谓服务提供者就是某种可用来创建或交付一个服务的东西；
  // 在这里，它通过实例化 HeroService 类，来提供该服务。
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Hero[] {
    return HEROES;
  }

  /*
    现实应用重的服务返回结果由于要等待服务端的 response, 所以，通常是异步的。
    这种场景可以通过返回 Observable 来实现 ( 比如， HttpClient.get() 会返回 Observable )
    Observable 是 RxJS 库中的一个关键类
  */
  getHeroesAsync(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    // of(HEROES) 会返回一个 Observable<Hero[]>，
    // 它会发出单个值，这个值就是这些模拟英雄的数组。
    // 如果从真实的服务器请求，HttpClient.get<Hero[]>() 也同样返回一个 Observable<Hero[]>
    return of(HEROES);
  }
}
