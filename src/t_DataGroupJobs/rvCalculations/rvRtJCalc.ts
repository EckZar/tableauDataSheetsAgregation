function rvRtJCalc(){

    if(!mainRVConfigSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }
    

    let rvRange = mainRVConfigSheet.getRange(2, 1, mainRVConfigSheet.getLastRow() - 1, mainRVConfigSheet.getLastColumn()).getValues();

    if(!mainSTDataGroupSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }


    let materialUnitsArray = mainSTDataGroupSheet.getRange(3, 3, mainSTDataGroupSheet.getLastRow() - 2, 1).getValues();

    let array: Array<Array<number|string>> = [];


    mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .forEach((row, i) => {
                            let frvRange = rvRange.filter(e => compareTwoString(row[0], e[1]));
                            
                            array.push(['', '', '', ''])                           
                            
                            if(frvRange.length > 0)
                            {
                                var q = frvRange.filter(e => compareTwoString(row[1], e[0]));
                                
                                if(q.length > 0){

                                    materialUnitsArray[i][0] = q[0][2];
                                    
                                    array[i][0] = q[0][3];
                                    array[i][2] = q[0][4];
                                    array[i][3] = row[3] * q[0][3];
                                } else {
                                    array[i][0] = 1;
                                    array[i][2] = 'о';
                                    array[i][3] = row[3];
                                }

                            } else {
                                array[i][0] = 1;
                                array[i][2] = 'о';
                                array[i][3] = row[3];
                            }
                        });


    mainSTDataGroupSheet.getRange(3, 9, array.length, array[0].length).setValues(array);
    mainSTDataGroupSheet.getRange(3, 3, materialUnitsArray.length, 1).setValues(materialUnitsArray);
}