function setSTDataGroupCategories(){

    let catRange = getjobCat();
    
    if(!mainSTDataGroupSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }

    let dataGroupRange = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .map(row => {
                            
                            row[7] = catRange.filter(job => compareTwoString(job[0], row[0]))[0][1];

                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 1, dataGroupRange.length, dataGroupRange[0].length).setValues(dataGroupRange);

}

function getjobCat(){

    if(!mainTJobSheet)
    {
        throw Error('mainJobGroupConfigSheet !!!')
    }

    return mainTJobSheet.getRange(2, 12, mainTJobSheet.getLastRow(), 2).getValues();

}
