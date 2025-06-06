import UserDTO from "../DTOs/UserDTO.js";
import UserRepository from "../repositories/UserRepository.js";

class UserService{
    private repository: UserRepository

    constructor(){
        this.repository = new UserRepository
    }

    async create(data: UserDTO){
        findEmail = this.repository.findEmail(data.)
    }

}