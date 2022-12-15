export class Employee {
    constructor(
        public companyId: string,
        public deviceId: string,
        public fullName: string,
        public role: string,
        public issueDate: string,
        public remark: string,
        public empStatus: string,
        public company: string,
        public city: string,
        public id?: string,
        public createdAt?: string,
        public updatedAt?: string,
    ) {
        
    }
}