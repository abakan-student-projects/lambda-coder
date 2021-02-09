const getMonthPeriodByMonthString = (monthString, prevMonth = false) => {

    let year, month;
    if (monthString != null) {
        [year, month] = monthString.split('-').map(s => parseInt(s));
        month -= 1;
    } else {
        const d = new Date();
        year = d.getFullYear();
        month = d.getMonth();
    }

    if(prevMonth){
        return {
            from: new Date(year, month-1, 1, 0,0,0),
            to: new Date(year, month, 1, 0,0,0),
        }
    }

    return {
        from: new Date(year, month, 1, 0,0,0),
        to: new Date(year, month+1, 1, 0,0,0),
    }
}

export { getMonthPeriodByMonthString }