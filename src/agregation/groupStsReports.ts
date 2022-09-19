function groupStsReports() {
    if (!mainSTDataGroupSheet) {
        throw Error('mainSTDataGroupSheet !!!');
    }
    clearSheet(mainSTDataGroupSheet, 3);
    let statementHeadKeys = mainSTDataGroupSheet.getRange(2, 1, 1, 6).getValues()[0];
    main.getSheets()
        .filter(list => list.getName().indexOf('st_') >= 0)
        .forEach(list => {
        let listValues = list.getRange(1, 1, list.getLastRow(), list.getLastColumn()).getValues();


        let objectName = listValues[0][0].slice();        
        
        let listHeadKeys = listValues[0].slice().filter(e=>e);


        listValues = rotateArray(listValues).filter(e => e[0]);       
        
        Logger.log(statementHeadKeys)

        // Сортируем строки по порядку по ключам из главного листа
        for (let i = 0; i < statementHeadKeys.length; i++) {
            

            if(listHeadKeys.indexOf(statementHeadKeys[i]) < 0){
              
              let tempArr = emptyRowArray(statementHeadKeys[i], listValues[0].length);
              listValues.push(tempArr);
            }

            let temp = listValues[i].slice();
            for (let j = 0; j < listValues.length; j++) {
                if (listValues[j][0] == statementHeadKeys[i]) {
                    listValues[i] = listValues[j];
                    listValues[j] = temp;
                    break;
                }
            }

            if (statementHeadKeys[i] == 'object') {
              let a = [];
              a[0] = 'object';
              a[1] = 'object';
              for (let j = 2; j < listValues[0].length; j++) {
                  a.push(objectName);
              }
              listValues[i] = a;
            }

            if (statementHeadKeys[i] == 'listName') {
              let a = [];
              a[0] = 'listName';
              a[1] = 'listName';
              for (let j = 2; j < listValues[0].length; j++) {
                  a.push(list.getSheetName());
              }              
              listValues[i] = a;
            }

        }

        listValues = rotateArray(listValues);

        if (!mainSTDataGroupSheet) {
          throw Error('mainSTDataGroupSheet !!!');
        }

        listValues.splice(0,2)
        mainSTDataGroupSheet.getRange(mainSTDataGroupSheet.getLastRow() + 1, 1, listValues.length, listValues[0].length).setValues(listValues);
    });
}

function emptyRowArray(headKey: string, length: number){

  let arr = [headKey];

  for(let i = 1; i < length; i++){
    arr[i] = '';
  }

  return arr;

}

function rotateArray(array: Array<Array<string|number>>){
  let newArr = [[array[0][0]]];
  for (let i = 0; i < array[0].length; i++) {
    newArr[i] = [];
    for (let j = 0; j < array.length; j++) {   
      newArr[i][j] = array[j][i];
    }
  }
  return newArr;
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

    cropSheetToData(mainSTDataGroupSheet);

}

