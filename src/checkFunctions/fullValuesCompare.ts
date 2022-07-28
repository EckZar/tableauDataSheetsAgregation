function compareRevitMappingMaterials(){

    if(!mainSTDataGroupSheet){
        throw Error('mainSTDataGroupSheet lost !!!');
    }

    let stMaterialsRange = mainSTDataGroupSheet.getRange(2, 2, mainSTDataGroupSheet.getLastRow() - 1, 7).getValues();

    if(!mainTMapSheet){
        throw Error('mainTMapSheet lost !!!');
    }

    let mapMaterialsRange = mainTMapSheet.getRange(2, 2, mainTMapSheet.getLastRow() - 1, 8).getValues();
                         
    let array = [['dataGroup material', 'map material', 'fixed']];

    stMaterialsRange.forEach((item, index) => {

        let filteredMapArray = mapMaterialsRange.filter(jtem => jtem[7] == item[6]);

        if(filteredMapArray.length > 0)
        {
            for(let i = 0; i < filteredMapArray.length; i++)
            {
                let isFixable = compareTwoVals(item[0], filteredMapArray[i][0]);
                
                if(isFixable) {
                    array.push([item[0], filteredMapArray[i][0], item[0]]);
                    setFixedMaterialName(mainSTDataGroupSheet, index + 2, 2, filteredMapArray[i][0]);
                    break;
                }
            }
        }


    })

    if(!mainCheckListSheet){
        throw Error('mainCheckListSheet lost !!!');
    }

    clearSheet(mainCheckListSheet, 1);

    mainCheckListSheet.getRange(1, 1, array.length, array[0].length).setValues(array);

}

function setFixedMaterialName(sheet: any, row: number, col: number, value: string){
    
    if(!sheet){
        throw Error(`${sheet} lost !!!`);
    }

    sheet.getRange(row, col).setValue(value);

}


function compareTwoVals(valOne: string, valTwo: string) {   

    if(valOne == valTwo)
    {
        return false;
    }

    let a = valOne.replace(/\s/g,"").toLowerCase();
    let b = valTwo.replace(/\s/g,"").toLowerCase();

    if(a == b)
    {
        if(valOne != valTwo)
        {
            return true;
        }
    } else {
        return false;
    }

}
