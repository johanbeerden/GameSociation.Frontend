export class KickAssociateCommand {
    public constructor(
        public responsibleId: string,
        public associationId: string,
        public associateId: string
    ) {
    }
}