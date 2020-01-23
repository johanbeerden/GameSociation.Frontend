import { Association } from 'src/app/shared/models/associations/association.model';

export class LoadOwnedAssociations {
    public static readonly type = '[Dashboard] Load Owned Associations';
    public constructor(public ownedAssociations: Association[]) { }
}

export class LoadJoinedAssociations {
    public static readonly type = '[Dashboard] Load Joined Associations';
    public constructor(public joinedAssociations: Association[]) { }
}