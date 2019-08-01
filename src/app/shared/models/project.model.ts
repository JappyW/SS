export class Project {
    id: string;
    imgref: string;
    name: string;
    description: string;
    users: [{
        email:string;
        value: boolean;
        role: string;
    }];
    owner: string;
}