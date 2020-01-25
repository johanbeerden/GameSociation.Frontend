export class AcceptInvitationCommand {
    public constructor(
        public responsibleId: string,
        public associationId: string,
        public associateId: string
    ) {
    }
}