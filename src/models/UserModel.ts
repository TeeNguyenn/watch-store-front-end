interface IRole {
    id: number;
    name: string;
}

class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address?: string;
    role?: IRole[];


    constructor(userId: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        address: string,
        role: IRole[],
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.role = role;

    }

}

export default UserModel;