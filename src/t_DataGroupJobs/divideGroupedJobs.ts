function divideGroupedJobs(){

    if(!mainSTDataGroupSheet)
    {
        throw Error('mainSTDataGroupSheet!!!');
    }

    let array: Array<Array<string|number>> = [];

    mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow(), mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .forEach(row => {
                            if(row[0].indexOf('|')>=0)
                            {
                                let tempArr: Array<string> = row[0].split('|');

                                tempArr.forEach(item => {
                                    array.push([
                                        item,
                                        row[1],
                                        row[2],
                                        row[3],
                                        row[4],
                                        row[5],
                                        row[6]
                                    ]);
                                });
                            }
                        });

    mainSTDataGroupSheet.getRange(mainSTDataGroupSheet.getLastRow() + 1, 1, array.length, array[0].length).setValues(array);
}   