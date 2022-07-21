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

    let dataGroupRange = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .map(row => {
                            let frvExRange = rvExRange.filter(e => compareTwoString(row[0], e[0]));

                            if(frvExRange.length > 0 && !row[2])
                            {
                                row[2] = frvExRange[0][1];                            
                            } 
                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 1, dataGroupRange.length, dataGroupRange[0].length).setValues(dataGroupRange);

}