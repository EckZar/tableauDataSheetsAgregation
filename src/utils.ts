function clearSheet(sheet: any, startRow = 2) {  
  try{
    sheet.getRange(startRow, 1, sheet.getLastRow()-1, sheet.getLastColumn()).clear();
  } catch(e){}
}

function removeArrayColumn(array: Array<Array<string>>, colNumber: number){
  return array.map(row => row.splice(colNumber, 1));
}

function getConfigSheetValueByField(field: String): string{

  let fields: Array<Array<string>>;

  if(mainConfigSheet)
  {
    fields = mainConfigSheet.getRange(1, 1, mainConfigSheet.getLastRow(), 2).getValues();
  } else {
    return '';
  }

  let searchValue = fields.filter(row => row[0] === field)[0][1];

  if(searchValue){
    return searchValue;
  } else {
    return '';
  }

}

function replaceDots(){


  let active = main.getActiveRange();
  
  if(!active)
  {
    throw Error('Error!')
  }

  let range = active.getValues().map(row => {
    
    if(String(row[0]).indexOf('.')>=0)
    {
      row[0] = String(row[0]).replace(/./,',');
    }
    return row;
  });

  main.getActiveRange()?.setValues(range)

}

function fillEmptyCellsWithZeroValue(){

  let active = main.getActiveRange();
  
  if(!active)
  {
    throw Error('Error!')
  }

  let range = active.getValues().map(row => {
    
    if(!row[0])
    {
      row[0] = 0;
    }
    return row;
  });

  main.getActiveRange()?.setValues(range)

}

function compareTwoString(stringOne: string, stringTwo: string){

  try{

    var a = stringOne.replace(/ /g,"").toLowerCase();
    var b = stringTwo.replace(/ /g,"").toLowerCase();

  } catch(e) {
    return false;
  }
  if(a == b)
  {
    return true;
  } else {
    return false;
  }

}

function searchBySubString(string: string, subString: string){

  try{

    var a = string.replace(/ /g,"").toLowerCase();
    var b = subString.replace(/ /g,"").toLowerCase();

  } catch(e) {
    return false;
  }

  if(a.indexOf(b)>=0)
  {
    return true;
  } else {
    return false;
  }

}


function cropSheetToData(sheet: any){

  if(!sheet)
  {
      throw Error(`${sheet}!!!`);
  }


  let lastRow = sheet.getLastRow();
  let lastCol = sheet.getLastColumn();

  let startRow = lastRow + 1;
  let startCol = lastCol + 1;

  let maxRow = sheet.getMaxRows();
  let maxCol = sheet.getMaxColumns();

  let numRows = maxRow - lastRow;
  let numCols = maxCol - lastCol;

  if(numRows > 0){
    sheet.deleteRows(startRow, numRows);
  }

  if(numRows > 0){
    sheet.deleteColumns(startCol, numCols);
  }    

}