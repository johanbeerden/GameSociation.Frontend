export class InvitedToAssociationEvent {
    public constructor(
        public associationId: string,
        public username: string,
        public tagNumber: number
    ) {
    }
}