import {Invitation} from "../../../shared/models/associations/invitation.model";

export class LoadInvitations {
    public static readonly type = '[Dashboard] Load invitations';
    public constructor(public invitations: Invitation[]) { }
}