import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagramComponent } from './diagram/diagram.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './Service/auth-guard-service';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { PanierComponent } from './panier/panier.component';
import { DashboardVendeurComponent } from './Vendeur/dashboard-vendeur/dashboard-vendeur.component';
import { VendeurGuard } from './Service/vendeur.guard';
import { AddproduitComponent } from './Vendeur/addproduit/addproduit.component';
import { CategorieComponent } from './Vendeur/categorie/categorie.component';
const routes: Routes = [
  {path: 'diagram', component: DiagramComponent},
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'panier', component: PanierComponent},
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'vendeur', component: DashboardVendeurComponent, canActivate: [VendeurGuard] },
  { path: 'addproduit', component : AddproduitComponent, canActivate : [VendeurGuard]},
  { path: 'categorie', component: CategorieComponent, canActivate: [VendeurGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
