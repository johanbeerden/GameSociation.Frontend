import { MembershipRole } from './membership-role.enum';
import { MembershipStatus } from './membership-status.enum';

export class Membership {
    public constructor(
        public associationId: string,
        public associateId: string,
        public role: MembershipRole,
        public status: MembershipStatus
    ) { }
}