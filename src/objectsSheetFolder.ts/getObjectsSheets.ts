function getObjectsSheets(){

    let files = DriveApp.getFolderById(OBJ_SHEETS_FOLDER_ID).getFiles();

    let arr = [];

    while(files.hasNext()){

        let file = files.next();
        let fileId = file.getId();
        let fileName = file.getName();
        arr.push([fileId, fileName])
    };
    return arr;
};