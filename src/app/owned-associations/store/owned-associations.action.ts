import { Association } from 'src/app/shared/models/associations/association.model';

export class LoadOwnedAssociations {
    public static readonly type = '[Owned Associations] Load owned associations';
    public constructor(public associations: Association[]) { }
}

export class LoadAssociation {
    public static readonly type = '[Owned Associations] Load association';
    public constructor(public association: Association) { }
}