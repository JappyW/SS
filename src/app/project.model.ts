
export class Project {
    id: string;
    name: string;
    description: string;
    users: {
        email:string;
        value: boolean;
    };
    owner: string;
}
