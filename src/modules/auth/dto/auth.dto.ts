import { Users } from 'src/shared/types';

export default class UserDTO {
  id: string;
  name: string;
  lastname: string;
  email: string;
  constructor(user: Users) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.lastname = user.lastname;
  }
}
const usersDTO = (users: Users) => {
  if (Array.isArray(users)) {
    return users.map((user) => {
      return { ...new UserDTO(user) };
    });
  } else {
    return { ...new UserDTO(users) };
  }
};

export { usersDTO };
