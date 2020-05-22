import {Cycle, Dose} from './types';

export const summarizeAmounts = (doses: Dose[]) : string => {
    let count = [];
    for(let i = 0; i<doses.length; i++) {
        let included = false;
        for(let j = 0; j<count.length; j++) {
            if(count[j].amount === doses[i].amount && count[j].unit === doses[i].unit) {
                included = true;
                count[j].total++;
            }
        }
        if(included === false) {
            count.push({amount: doses[i].amount, unit: doses[i].unit, total: 1});
        }

    }

    var s = "";

    for(let i = 0; i<count.length; i++) {
        if(i > 0) s += " + "
        s += count[i].total + "x" + count[i].amount + count[i].unit;
    }

    return s;
}
export const summarizeDoses = (doses: Dose[]) => {
    let s : string = "kl. ";
    doses.map((dose, i) => {
        if(i > 0) s += "/";
        s += dose.hour;
        if(dose.minute !== "00") {
            s+=":"+dose.minute;
        }
        return 0;
    });

    return s;
}

export const formatDate = (d : Date) : string => {
    const months = ["jan", "feb", "mar", "apr", "maí", "jún", "júl", "ágú", "sep", "okt", "nóv", "des"];

    return d.getDate() + ". " + months[d.getMonth()] + " " + d.getFullYear();
}