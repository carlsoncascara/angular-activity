//Date format in YYYY-MM-DD

const MONTH = [
    'JANUARY',
    'FEBUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
]

export function getDateEnglishFormat(dateToFormat : Date) : string{
    const date = dateToFormat;
    
    const year = date.getFullYear();
    const month = MONTH[date.getMonth()];
    const day = date.getDate();

    return (month + " " + day + ", " + year);
}

export function getDateYMDFormat(dateToFormat : Date) : string {
    const date=dateToFormat;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return year + "-" + 
        (month.toString().length > 1 ? month:"0" + month) + "-" + 
        (day.toString().length > 1 ? day : "0"+day);
}