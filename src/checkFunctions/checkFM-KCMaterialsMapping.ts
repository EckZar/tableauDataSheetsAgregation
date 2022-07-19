function getFMKCMaterialsMapping(){

    if(!mainSTDataGroupSheet)
    {
        throw Error('mainSTDataGroupSheet lost!!!')
    }

    let stRange = mainSTDataGroupSheet.getRange(3, 2, mainSTDataGroupSheet.getLastRow() - 2, 7).getValues();

    if(!mainTMapSheet)
    {
        throw Error('mainTMapSheet lost!!!')
    }

    let tRange = mainTMapSheet.getRange(2, 2, mainTMapSheet.getLastRow() - 1, 8).getValues();

    let arr = [['материал Revit', 'Категория']];

    for(let i = 0; i < stRange.length; i++)
    {
        let range = tRange.filter(row => row[0] == stRange[i][0])
                          .filter(row => row[7] == stRange[i][3])
        
        if(range.length == 0){
            arr.push([stRange[i][0], stRange[i][6]]);
        }
    }

    return arr.filter(e => e[0]);

}


function  pasteFMKCMaterialsMapping(){

    if(!mainCheckListSheet)
    {
        throw Error('mainCheckListSheet lost!!!')
    }

    let arr = getFMKCMaterialsMapping();

    clearSheet(mainCheckListSheet, 1);

    mainCheckListSheet.getRange(1, 1, arr.length, arr[0].length).setValues(arr);

}