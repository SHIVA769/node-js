import { userList } from "../model/usersModel.js";

export function getUsers(req, resp) {
    const users = userList();
    resp.render("User", { users });
    console.log( "fdf--------------->",users);
    
}

 
