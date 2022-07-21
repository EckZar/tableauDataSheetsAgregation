function rvRtMCalc(){

    if(!mainTMapSheet)
    {
      throw Error('mainTMapSheet Lost');
    }
    

    let rvExRange = mainTMapSheet.getRange(2, 1, mainTMapSheet.getLastRow() - 1, mainTMapSheet.getLastColumn()).getValues();

    if(!mainSTDataGroupSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }

    let dataGroupRange = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .map(row => {
                            let frvExRange = rvExRange.filter(e => compareTwoString(row[1], e[1]));

                            if(frvExRange.length > 0)
                            {
                                let q = frvExRange.filter(e => compareTwoString(row[7], e[8]));
                                
                                if(q.length > 0){
                                    row[9] = q[0][7];
                                } else {
                                    row[9] = 1;
                                }

                            } else {
                                row[9] = 1;
                            }

                            row[12] = row[11] * row[9];

                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 1, dataGroupRange.length, dataGroupRange[0].length).setValues(dataGroupRange);

}