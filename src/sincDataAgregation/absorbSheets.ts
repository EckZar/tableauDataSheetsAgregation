function updateFromStatements(){

    let sheetsIds = getStatementsSheetsIdsArrayFromSincFolder();

    updateDataFromStatementSheets(sheetsIds);

    cleanSincFolder();

}

function goAroundFolderFiles(){

}

function getStatementsSheetsIdsArrayFromSincFolder(): Array<Array<string>>{
    
    let folder = DriveApp.getFolderById(SINC_DATA_FOLDER_ID);
    
    let sheetsIdsArray = [];

    if(!folder)
    {
        throw Error('Folder doesn\'t exist or you do not have access to it.');
    }

    let files = folder.getFiles();

    while(files.hasNext())
    {
        let file = files.next();
        let fileId = file.getId();
        let fileName = file.getName();
        
        fileName = fileName.replace(/ \(\w{1,3}\)|null/,"").replace(/  /g, " ").replace(/ /g, "_");

        sheetsIdsArray.push([fileId, fileName]);
    
    }

    return sheetsIdsArray;

}   

function updateDataFromStatementSheets(sheetsIds: Array<Array<string>>){
    
    sheetsIds.forEach(id => {
        let dataArray = getStatementSheetData(id[0]);
        pasteStatementArray(dataArray, id[1]);
    })
}

function getStatementSheetData(stSheetId: string): Array<Array<string>>{
    let stMain = SpreadsheetApp.openById(stSheetId);
    let stMainSheet = stMain.getSheets()[0];
    return stMainSheet.getRange(1, 1, stMainSheet.getLastRow(), stMainSheet.getLastColumn()).getValues();
}

function pasteStatementArray(dataArray: Array<Array<string>>, sheetName: string){

    let stSheet = getStatementSheet(sheetName);
    
    clearSheet(stSheet);

    if(stSheet)
    {
        stSheet.getRange(2, 1, dataArray.length, dataArray[0].length).setValues(dataArray);
    } else {
        throw Error('Main was lost');
    }

}

function getStatementSheet(sheetName: string){

    let sheetsNames;
    let statementSheet;

    if(main)
    {
        sheetsNames = main.getSheets();
        statementSheet = sheetsNames.filter(sheet => sheet.getName() === `st_${sheetName}`)[0];
    } else {
        throw Error('Main was lost');
    }    

    if(statementSheet){
        return statementSheet;
    } else {
        pasteStatementSheet(sheetName);
        return main.getSheetByName(`st_${sheetName}`);
    }

}

function pasteStatementSheet(sheetName: string){
    main.insertSheet(`st_${sheetName}`);
}

function cleanSincFolder(){
    
    let folder = DriveApp.getFolderById(SINC_DATA_FOLDER_ID);
    
    if(!folder)
    {
        throw Error('Folder doesn\'t exist or you do not have access to it.');
    }

    let files = folder.getFiles();

    while(files.hasNext())
    {
        let file = files.next();
        file.setTrashed(true);        
    }

}