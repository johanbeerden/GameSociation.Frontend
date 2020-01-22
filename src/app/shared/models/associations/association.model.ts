import { Membership } from './membership.model';

export class Association {
    public constructor(
        public id: string,
        public name: string,
        public members: Membership[]
    ) { }
}