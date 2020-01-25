import {Association} from "../../../shared/models/associations/association.model";
import {Invitation} from "../../../shared/models/associations/invitation.model";

export class LoadOwnedAssociations {
    public static readonly type = '[Dashboard] Load Owned Associations';
    public constructor(public ownedAssociations: Association[]) { }
}

export class LoadJoinedAssociations {
    public static readonly type = '[Dashboard] Load Joined Associations';
    public constructor(public joinedAssociations: Association[]) { }
}

export class LoadInvitations {
    public static readonly type = '[Dashboard] Load invitations';
    public constructor(public invitations: Invitation[]) { }
}