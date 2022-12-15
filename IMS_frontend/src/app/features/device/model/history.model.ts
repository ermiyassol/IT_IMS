export class History {
    constructor(
        public actionDate: string,
        public actionType: string,
        public deviceId: string,
        public description: string,
        public actionBy: string,
        public id?: string,
        public createdAt?: string,
        public updatedAt?: string,
    ) {
        
    }
}