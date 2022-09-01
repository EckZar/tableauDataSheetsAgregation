// prod script ID = 1U-y9lPMbAVMlWczWTLdKdtKKaq6UNzyh0wc1vLnJhHzrsYtvJfU8w0u0
// test script ID = 1MG5_Hnm0mQz4sih2ElA7shzfxwcWc0g4nG0R_rLboxJIPSFsiYhitJQP

const main = SpreadsheetApp.getActiveSpreadsheet();

const mainEntranceDataSheet = main.getSheetByName('entranceData');
const mainRawDataSheet = main.getSheetByName('rawData');

const mainConfigSheet = main.getSheetByName('config.ini');

const mainJobConfigSheet = main.getSheetByName('sheets_data_job_config');
const mainMapConfigSheet = main.getSheetByName('sheets_data_map_config');
const mainPriceConfigSheet = main.getSheetByName('sheets_data_price_config');
const mainJobGroupConfigSheet = main.getSheetByName('jobGroup_config');
const mainRVConfigSheet = main.getSheetByName('rv_config');
const mainRVExeptionsConfigSheet = main.getSheetByName('rv_exeptions_config');
const mainOSCondigSheet = main.getSheetByName('sheets_data_o/s_config');
const mainOSExeptionsSheet = main.getSheetByName('os_exeptions_config');
const mainUniteExeptionsConfigSheet = main.getSheetByName('unite_exeptions_config');

const mainTJobSheet = main.getSheetByName('t_job');
const mainTRawJobSheet = main.getSheetByName('t_raw_job');
const mainTMapSheet = main.getSheetByName('t_map');
const mainTPriceSheet = main.getSheetByName('t_price');

const mainSTDataGroupSheet = main.getSheetByName('t_statement_dataGroup');

const mainMapSheetSheet = main.getSheetByName('Карта таблицы');
const mainUploadConfigsSheet = main.getSheetByName('Листы настроек выгрузок');
const mainTableauDataListSheet = main.getSheetByName('Листы с данными под табло');
const mainStsListSheet = main.getSheetByName('Листы ведомостей');

const SINC_DATA_FOLDER_ID = getConfigSheetValueByField('SINC_DATA_FOLDER_ID');

const mainCheckListSheet = main.getSheetByName('checkList');

const exeptionCodes = [
    '6.2.2.7.2.1',
    '6.2.2.1.2.1.1',
    '6.2.2.1.1.1.1',
    '6.2.1.7.1.1.1',
    '6.2.3.1.6.4.1',
    '6.2.1.7.1.1.2',
    '6.2.2.8.5.1',
    '6.2.2.8.3.1',
    '6.2.3.1.7.2',
    
]

