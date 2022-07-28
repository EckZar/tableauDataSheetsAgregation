function uniteExeptionsRules(){

    if(!mainUniteExeptionsConfigSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }
    

    let rvExRange = mainUniteExeptionsConfigSheet.getRange(2, 1, mainUniteExeptionsConfigSheet.getLastRow() - 1, mainUniteExeptionsConfigSheet.getLastColumn()).getValues();

    if(!mainSTDataGroupSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }


    let materialUnitsArray = mainSTDataGroupSheet.getRange(3, 3, mainSTDataGroupSheet.getLastRow() - 2, 1).getValues();

    mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, 2)
                        .getValues()
                        .map((row, i) => {
                            let frvExRange = rvExRange.filter(e => compareTwoString(row[0], e[0]));

                            if(frvExRange.length > 0 && !row[2])
                            {
                              materialUnitsArray[i][0] = frvExRange[0][1];                            
                            } 
                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 3, materialUnitsArray.length, 1).setValues(materialUnitsArray);

}