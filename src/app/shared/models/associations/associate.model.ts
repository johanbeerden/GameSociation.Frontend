import {Tag} from './tag.model';

export class Associate {
    public constructor(
        public id: string,
        public accountId: string,
        public tag: Tag
    ) {
    }
}

export class AssociateDetail extends Associate {
    public constructor(
        public id: string,
        public accountId: string,
        public tag: Tag,
        public joinedAssociations: string[],
        public ownedAssociations: string[]
    ) {
        super(id, accountId, tag);
    }
}
