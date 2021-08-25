import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './COMMON/home/home.component';
import { SidenavComponent } from './COMMON/sidenav/sidenav.component';
import { CouponsComponent } from './DASHBOARD/coupons/coupons.component';
import { ForgotpasswordUserComponent } from './DASHBOARD/forgotpassword-user/forgotpassword-user.component';
import { ProductlistStatusComponent } from './DASHBOARD/productlist-status/productlist-status.component';
import { ReturnorderComponent } from './DASHBOARD/returnorder/returnorder.component';
import { TransactionsComponent } from './DASHBOARD/transactions/transactions.component';
import { ViewUserComponent } from './DASHBOARD/view-user/view-user.component';

const routes: Routes = [
  {path: '',component:HomeComponent,

  children: [
    {path: 'coupons',component:CouponsComponent},
    {path: 'productlist',component:ProductlistStatusComponent},
    {path: 'viewusers',component:ViewUserComponent},
    {path: 'forgotpassword',component:ForgotpasswordUserComponent},
    {path: 'Transactions',component:TransactionsComponent},
    {path: 'returnorder',component:ReturnorderComponent},


  ]},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
