import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpService} from './services/http.service';
import {NgxsModule} from '@ngxs/store';
import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';
import {TokenService} from './services/token.service';
import {AuthenticationInterceptor} from './interceptors/authentication.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {AppState} from './store/app.state';
import {AssociateService} from './services/associate.service';
import {AssociationService} from './services/association.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ToastService} from './services/toast.service';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {AccountService} from "./services/account.service";
import {AuthGuard} from "./guards/auth.guard";

const states = [
    AppState
];

@NgModule({
    imports: [
        NgxsModule.forRoot(states),
        NgxsStoragePluginModule.forRoot({
            key: 'app',
            storage: StorageOption.SessionStorage
        }),
        BrowserAnimationsModule,
        ToastrModule.forRoot({ positionClass: 'toast-top-right' })
    ],
    providers: [
        AuthGuard,
        HttpService,
        TokenService,
        AuthenticationService,
        AssociateService,
        AssociationService,
        AccountService,
        ToastService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
})
export class CoreModule {
    public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded, only import once.')
        }
    }
}