import {MembershipRole} from './membership-role.enum';
import {MembershipStatus} from './membership-status.enum';
import {Associate} from "./associate.model";

export class Membership {
    public constructor(
        public associationId: string,
        public associate: Associate,
        public role: MembershipRole,
        public status: MembershipStatus,
    ) {
    }
}