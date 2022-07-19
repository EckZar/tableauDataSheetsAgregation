function uploadSubMaterials(){

    if(!mainOSCondigSheet)
    {
        throw Error('Config list doesn\'t exist!')
    }

    let commonArray: Array<Array<string>>|Array<any> = [];

    let headKeys = mainOSCondigSheet.getRange(1, 1, 1, mainOSCondigSheet.getLastColumn()).getValues()[0];

    mainOSCondigSheet.getRange(2, 1, mainOSCondigSheet.getLastRow() - 1, mainOSCondigSheet.getLastColumn()).getValues()
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

    if(!mainOSExeptionsSheet)
    {
        throw Error('mainTJobSheet list doesn\'t exist!')
    } 

    clearSheet(mainOSExeptionsSheet);

    commonArray = commonArray;
                             
    mainOSExeptionsSheet.getRange(2, 1, commonArray.length, commonArray[0].length).setValues(commonArray);

}

function sortSMaterials(){

    if (!mainOSExeptionsSheet) {
        throw Error('mainTJobSheet list doesn\'t exist!');
    }

    let range = mainOSExeptionsSheet.getRange(2, 1, mainOSExeptionsSheet.getLastRow() - 1, mainOSExeptionsSheet.getLastColumn()).getValues();
    
    var code_name = '';
    
    for (var i = 0; i < range.length; i++) {
        try{
          if (range[i][0].indexOf('КЦ') >= 0) {
              code_name = `${range[i][1].replace(/-/g,'.')} ${range[i][2]}`;
          }
        } catch(e) {
          continue;
        }
        for (let j = i + 1; j < range.length; j++) {
            if (range[j][3] == 'С' || range[j][3] == 'П' || range[j][3] == 'Сопутствующий') {
                range[j][0] = 'Checked';
                range[j][2] = code_name;
                range[j][3] = 'с'
            }
            try{
              if (range[j][0].indexOf('КЦ') >= 0) {
                  i = j - 1;
                  break;
              }
            } catch(e) {
                // i = j;
                break;
            }
        }
    }

    clearSheet(mainOSExeptionsSheet);

    range = range.filter(row => row[0] == 'Checked' && row[4]);

    mainOSExeptionsSheet.getRange(2, 1, range.length, range[0].length).setValues(range);
}