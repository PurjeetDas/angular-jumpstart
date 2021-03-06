import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DataService } from './services/data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggerService } from './services/logger.service';
import { TrackByService } from './services/trackBy.service';



@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [RouterModule, HttpClientModule, NavbarComponent],
  declarations: [NavbarComponent],
  providers: [DataService,LoggerService,TrackByService,
     AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: 'Window', useFactory: () => window }
  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard{ 

// Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  super(parentModule);
}

}
