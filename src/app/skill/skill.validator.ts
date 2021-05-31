import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Skill } from "./skill";


export function uniqueSkillValue (list : Skill[]) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        
        var doesExist = false;
        if(control.value != null && control.value != ""){
            doesExist = list.find( skill => skill.id === control.value ) ? true : doesExist;
        }
        
        return doesExist ? { idExist : true } : null;
    };
}