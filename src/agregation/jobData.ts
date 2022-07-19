function agregateJobs(){

    clearSheet(mainTRawJobSheet);

    if(!mainJobConfigSheet)
    {
        throw Error('Config list doesn\'t exist!')
    }

    let commonArray: Array<Array<string>>|Array<any> = [];

    let headKeys = mainJobConfigSheet.getRange(1, 1, 1, mainJobConfigSheet.getLastColumn()).getValues()[0];

    mainJobConfigSheet.getRange(2, 1, mainJobConfigSheet.getLastRow() - 1, mainJobConfigSheet.getLastColumn()).getValues()
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

    if(!mainTRawJobSheet)
    {
        throw Error('mainTJobSheet list doesn\'t exist!')
    } 
    commonArray = commonArray.filter(row => row[0] != 'Материалы' && row[1] && row[1] != 'С' && row[1] != 'О' && row[1] != '#REF!')
                             .map(row => [row[0], row[1].replace(/-/g,"."), row[2]]);
    mainTRawJobSheet.getRange(2, 1, commonArray.length, commonArray[0].length).setValues(commonArray);
    

}

