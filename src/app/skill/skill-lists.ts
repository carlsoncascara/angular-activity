import { Skill } from './skill';

export const Skills = () =>{
    var list : Skill[] = [];
    let fromStorage = window.localStorage.getItem("skill-list");

    if(typeof fromStorage === "string"){
        list = JSON.parse(fromStorage);
    }
    
    return list;
};

// [
//     { id: 1, name: "Fast Reading" },
//     { id: 2, name: "Fast Writing" }
// ];