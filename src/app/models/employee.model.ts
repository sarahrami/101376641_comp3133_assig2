export interface Employee {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    salary: number;
}
