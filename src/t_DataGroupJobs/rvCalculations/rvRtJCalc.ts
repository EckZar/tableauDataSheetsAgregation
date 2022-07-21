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

    let dataGroupRange = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .map(row => {
                            let frvRange = rvRange.filter(e => compareTwoString(row[0], e[1]));

                            if(frvRange.length > 0)
                            {
                                let q = frvRange.filter(e => compareTwoString(row[1], e[0]));
                                
                                if(q.length > 0){

                                    row[2] = q[0][2];
                                    row[8] = q[0][3];
                                    row[10] = q[0][4];
                                } else {
                                    row[8] = 1;
                                    row[10] = 'о';
                                }

                            } else {
                                row[8] = 1;
                                row[10] = 'о';
                            }

                            row[11] = row[3] * row[8];

                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 1, dataGroupRange.length, dataGroupRange[0].length).setValues(dataGroupRange);

}