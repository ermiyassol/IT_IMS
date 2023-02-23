export class Account {
    constructor(
        public userName: string,
        public role: string[],
        public status: boolean,
        public id?: string,
        public createdAt?: string,
        public updatedAt?: string,
    ) {
        
    }
}