import { Tag } from './tag.model';

export class Associate {
    public constructor(
        public id: string,
        public accountId: string,
        public tag: Tag
    ) { }
}
