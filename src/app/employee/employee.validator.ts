import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map } from 'rxjs/operators';

import { Employee } from "./employee";
import { EmployeeService } from "../employee.service";

export function uniqueEmployeeValue (list : Employee[]) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        
        var doesExist = false;
        if(control.value != null && control.value != ""){
            doesExist = list.find( employee => employee.employeeID === control.value ) ? true : doesExist;
        }
        
        return doesExist ? { idExist : true } : null;
    };
}

export function validateBirthdate (employeeService : EmployeeService) : ValidatorFn {
    
    return (control : AbstractControl) : ValidationErrors | null => {
        
        var isInvalidAge = false;
        
        if(employeeService.getEmployeeAge(control.value) < 15){
            isInvalidAge = true;
        }

        return isInvalidAge ? { invalidBirthdate : true } : null;
    }

}