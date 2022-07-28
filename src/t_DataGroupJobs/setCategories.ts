function setSTDataGroupCategories(){

    let catRange = getjobCat();
    
    if(!mainSTDataGroupSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }

    let categoriesArray: Array<Array<string>> = [];

    mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .map(row => {
                            try{
                                categoriesArray.push([catRange.filter(job => compareTwoString(job[0], row[0]))[0][1]]);
                            } catch(e) {
                                categoriesArray.push(['Неопределено']);
                            }
                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 8, categoriesArray.length, categoriesArray[0].length).setValues(categoriesArray);

}

function getjobCat(){

    if(!mainTJobSheet)
    {
        throw Error('mainJobGroupConfigSheet !!!')
    }

    return mainTJobSheet.getRange(2, 12, mainTJobSheet.getLastRow(), 2).getValues();

}
