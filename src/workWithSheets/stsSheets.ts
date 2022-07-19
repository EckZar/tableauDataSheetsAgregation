function getStsSheetsList(){
    return main.getSheets()
            .filter(sheet => sheet.getSheetName().indexOf('st_')>=0)
            .map(sheet => [
                sheet.getName(), 
                `${main.getUrl()}#gid=${sheet.getSheetId()}`
            ]);
}

function pasteStsSheetsList(){

    

    if(!mainStsListSheet)
    {
        throw Error('mainStsListSheet!!!');
    }

    mainStsListSheet.activate();

    clearSheet(mainStsListSheet);

    let stsSheetsArray = getStsSheetsList();

    mainStsListSheet.getRange(2, 1, stsSheetsArray.length, stsSheetsArray[0].length).setValues(stsSheetsArray);

}