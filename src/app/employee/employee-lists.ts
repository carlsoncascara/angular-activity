import { Employee } from './employee';

export const Employees = () => {
    var list : Employee[] = [];
    let fromStorage = window.localStorage.getItem("employee-list");
    
    if(typeof fromStorage === "string"){
        list = JSON.parse(fromStorage);
    }

    return list;

}