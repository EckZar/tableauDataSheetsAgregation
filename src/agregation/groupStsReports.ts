function groupStsReports(){

    if(!mainSTDataGroupSheet)
    {
        throw Error('mainSTDataGroupSheet !!!')
    }

    clearSheet(mainSTDataGroupSheet, 3);

    let headKeys = mainSTDataGroupSheet.getRange(2, 1, 1, mainSTDataGroupSheet.getLastColumn()).getValues()[0];

    main.getSheets()
    .filter(sheet => sheet.getName().indexOf('st_')>=0)
    .forEach(sheet => {
        let lastRow = mainSTDataGroupSheet.getLastRow() + 1;
        sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
        .forEach((key, i) => {
            if(key)
            {   
                let pos = headKeys.indexOf(key) + 1;
                let colArray = sheet.getRange(3, i+1, sheet.getLastRow() - 2, 1).getValues();
                
                pasteSTsOnGroupSheet(colArray, pos, lastRow);
            }
        });
    })

}

function pasteSTsOnGroupSheet(array: Array<Array<string|number>>, pos: number, lastRow: number){
    if(!mainSTDataGroupSheet)
    {
        throw Error('mainSTDataGroupSheet !!!')
    }
    mainSTDataGroupSheet.getRange(lastRow, pos, array.length, 1).setValues(array);
}

function deleteEmptyJobs(){

    const emptyOptions = [
        '-',
        '!!! Нет работы',
        '!!! Нет работы !!!'
    ];

    if(!mainSTDataGroupSheet)
    {
        throw Error('mainSTDataGroupSheet !!!')
    }

    let range = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, 7).getValues()
                .filter(row => emptyOptions.indexOf(row[0])<0 && row[0])

    clearSheet(mainSTDataGroupSheet, 3);

    mainSTDataGroupSheet.getRange(3, 1, range.length, range[0].length).setValues(range);

}

