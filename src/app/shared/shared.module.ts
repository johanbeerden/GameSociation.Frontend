import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateAssociationModalComponent } from './components/create-association-modal/create-association-modal.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule 
    ],
    declarations: [
        CreateAssociationModalComponent
    ],
    exports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        CreateAssociationModalComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class SharedModule {}