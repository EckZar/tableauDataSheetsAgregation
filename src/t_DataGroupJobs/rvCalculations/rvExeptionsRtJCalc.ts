function rvExeptionsRtJCalc(){

    if(!mainRVExeptionsConfigSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    };
    

    let rvExRange = mainRVExeptionsConfigSheet.getRange(2, 1, mainRVExeptionsConfigSheet.getLastRow() - 1, mainRVExeptionsConfigSheet.getLastColumn()).getValues();

    if(!mainSTDataGroupSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    };

    let dataGroupRange = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .map(row => {
                            let frvExRange = rvExRange.filter(e => compareTwoString(row[0], e[0]));

                            if(frvExRange.length > 0)
                            {
                                let q = frvExRange.filter(e => compareTwoString(row[1], e[1]));
                                
                                if(q.length > 0){

                                    row[8] = q[0][2];
                                    row[9] = q[0][3];

                                    row[11] = row[3] * q[0][2];
                                    row[12] = (row[3] * q[0][2]) * q[0][3];

                                };

                            };
                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 1, dataGroupRange.length, dataGroupRange[0].length).setValues(dataGroupRange);

  };