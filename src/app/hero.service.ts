import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

// 使用 RxJS 的 catchError() 操作符来建立对 Observable 结果的处理管道（pipe）
import { catchError, map, tap } from 'rxjs/operators';


// @Injectable() 装饰器。 它把这个类标记为依赖注入系统的参与者之一。
// 在 @Injectable 元数据中注册该提供者，还能允许 Angular 通过移除那些完全没有用过的服务来进行优化。
@Injectable({
  // 必须先注册一个服务提供者，来让 HeroService 在依赖注入系统中可用.
  // 所谓服务提供者就是某种可用来创建或交付一个服务的东西；
  // 在这里，它通过实例化 HeroService 类，来提供该服务。
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /*
    现实应用重的服务返回结果由于要等待服务端的 response, 所以，通常是异步的。
    这种场景可以通过返回 Observable 来实现 ( 比如， HttpClient.get() 会返回 Observable )
    Observable 是 RxJS 库中的一个关键类
    本方法的调用者调用该方法的后面接一个订阅 .subscribe 来在数据返回后进一步处理.
  */
  getHeroesAsync(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    // of(HEROES) 会返回一个 Observable<Hero[]>，
    // 它会发出单个值，这个值就是这些模拟英雄的数组。
    // 如果从真实的服务器请求，HttpClient.get<Hero[]>() 也同样返回一个 Observable<Hero[]>
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
    // 建立对 Observable 结果的处理管道（pipe）
    .pipe(
      // 管道中的 catchError() 操作符会拦截失败的 Observable。 它把错误对象传给错误处理器，错误处理器会处理这个错误。
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // 本方法的调用者调用该方法的后面接一个订阅 .subscribe 来在数据返回后进一步处理.
  getHeroAsync(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    //  return of(HEROES.find(h => h.id === id));

    // 建立对 Observable 结果的处理管道（pipe）
    return this.http.get<Hero>(url).pipe(

      // 管道中  tap() 操作符可以查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来。
      // 这种 tap() 回调不会改变这些值本身。
      tap(_ => this.log(`fetched hero id=${id}`)),

      // 管道中的 catchError() 操作符会拦截失败的 Observable。 它把错误对象传给错误处理器，错误处理器会处理这个错误。
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // 使用 map 的一个例子
  // 其它 API 可能在返回对象中深埋着你想要的数据。 可借助 RxJS 的 map() 操作符对 Observable 的结果进行处理，以便把这些数据挖掘出来。
  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
