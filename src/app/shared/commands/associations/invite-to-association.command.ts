export class InviteToAssociationCommand {
    public constructor(
        public responsibleId: string,
        public associationId: string,
        public username: string,
        public tagNumber: number
    ) {
    }
}