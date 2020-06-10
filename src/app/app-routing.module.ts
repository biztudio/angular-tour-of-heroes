import { NgModule } from '@angular/core';
// 1. 导入路由模块
import { RouterModule, Routes } from '@angular/router';

// 2. 导入路由对应的显示组件
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// 3. 设定路由
// Routes 告诉路由器，当用户单击链接或将 URL 粘贴进浏览器地址栏时要显示哪个视图。
/*
  典型的 Angular Route 具有两个属性：
    path: 用来匹配浏览器地址栏中 URL 的字符串。
    component: 导航到该路由时，路由器应该创建的组件。
*/
const routes: Routes = [
  // 默认路由, 重定向到路径 dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // path 中的冒号（:）表示 :id 是一个占位符
  { path: 'detail/:id', component: HeroDetailComponent },
  // 如果网址类似于 localhost:4200/heroes 就显示 HeroesComponent。
  { path: 'heroes', component: HeroesComponent }
];

// @NgModule 元数据会初始化路由器，并开始监听浏览器地址的变化。
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // 导出 RouterModule，以便它在整个应用程序中生效。
  exports: [RouterModule]
})
export class AppRoutingModule { }
