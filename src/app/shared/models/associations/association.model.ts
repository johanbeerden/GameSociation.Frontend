import {Membership} from "./membership.model";

export class Association {
    public constructor(
        public id: string,
        public name: string
    ) {
    }
}

export class AssociationDetail extends Association {
    public constructor(
        public id: string,
        public name: string,
        public members: Membership[]
    ) {
        super(id, name);
    }
}

