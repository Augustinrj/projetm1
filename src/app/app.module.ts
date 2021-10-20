import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GojsAngularModule } from 'gojs-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ToolbarAdminComponent } from './Admin/toolbar-admin/toolbar-admin.component';
import { PanierComponent } from './panier/panier.component';
import { ToolbarVendeurComponent } from './Vendeur/toolbar-vendeur/toolbar-vendeur.component';
import { DashboardVendeurComponent } from './Vendeur/dashboard-vendeur/dashboard-vendeur.component';
import { VendeurcardComponent } from './Vendeur/vendeurcard/vendeurcard.component';
import { AddproduitComponent } from './Vendeur/addproduit/addproduit.component';
import { CategorieComponent } from './Vendeur/categorie/categorie.component';
import { EditproduitComponent } from './Vendeur/editproduit/editproduit.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    WelcomeComponent,
    ToolbarComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ToolbarAdminComponent,
    PanierComponent,
    ToolbarVendeurComponent,
    DashboardVendeurComponent,
    VendeurcardComponent,
    AddproduitComponent,
    CategorieComponent,
    EditproduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,GojsAngularModule,FormsModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DiagramComponent,WelcomeComponent]
})
export class AppModule { }
