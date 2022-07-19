function agregatePrices(){

    clearSheet(mainTPriceSheet);

    if(!mainPriceConfigSheet)
    {
        throw Error('Config list doesn\'t exist!')
    }

    let commonArray: Array<Array<string>>|Array<any> = [];

    let headKeys = mainPriceConfigSheet.getRange(1, 1, 1, mainPriceConfigSheet.getLastColumn()).getValues()[0];

    mainPriceConfigSheet.getRange(2, 1, mainPriceConfigSheet.getLastRow() - 1, mainPriceConfigSheet.getLastColumn()).getValues()
    .forEach(config => {

        let array: Array<Array<string>>|Array<any> = [];

        let sheet = SpreadsheetApp
                    .openById(config[headKeys.indexOf('sheet_id')])
                    .getSheetByName(config[headKeys.indexOf('sheet_structure_data_list_name')])
        
        

        let startRow = config[headKeys.indexOf('sheet_structure_data_list_start_row')];

        headKeys.forEach(key => {
           
            if(key.indexOf('_Col') >= 0){
                
                let startCol = config[headKeys.indexOf(key)];
               
                if(!sheet){
                    throw Error(`Sheet: ${config[headKeys.indexOf('sheet_id')]} missed!`);
                }
                
                let range: Array<Array<string>>;
                
                if(startCol != ''){
                    range = sheet.getRange(startRow, startCol, sheet.getLastRow() - startRow + 1, 1).getValues();
                } else {
                    range = sheet.getRange(startRow, 1, sheet.getLastRow() - startRow + 1, 1).getValues()
                    .map(row => [row[0] = '']);
                }
                
                array = concatToArray(array, range);
                
            }

        })
        commonArray = [...commonArray, ...array]
    })

    if(!mainTPriceSheet)
    {
        throw Error('mainTPriceSheet list doesn\'t exist!')
    } 
    commonArray = commonArray.filter(row => row[0]);
    mainTPriceSheet.getRange(2, 1, commonArray.length, commonArray[0].length).setValues(commonArray);
    

}

