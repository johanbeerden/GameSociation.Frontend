import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
    public constructor(private toastrService: ToastrService) { }

    public error(message: string): void {
        this.toastrService.error(message);
    }

    public success(message: string): void {
        this.toastrService.success(message);
    }

    public warning(message: string): void {
        this.toastrService.warning(message);
    }

    public info(message: string): void {
        this.toastrService.info(message);
    }
}