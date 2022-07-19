function menu() {
  
  SpreadsheetApp.getUi()
  .createMenu("__MENU__")   
  .addItem('Загрузить таблицы', 'updateFromStatements')  
  .addSeparator() 
  .addSubMenu(sheetsListsMenu()) 
  .addSeparator()
  .addSubMenu(subSheetsTravelMenu())
  .addSeparator()
  .addSubMenu(subTAggregationMenu())
  .addSeparator()  
  .addSubMenu(subUtilsMenu())
  .addSeparator()  
  .addSubMenu(checkListMenu())
  .addSeparator()  
  .addSubMenu(configsMenu())
  .addToUi()

}

function subTAggregationMenu(){
  return SpreadsheetApp.getUi()
  .createMenu("t_lists_functions")
  .addItem('Собрать работы', 'agregateJobs')
  .addItem('Собрать мэппинг', 'agregateMap')
  .addItem('Собрать цены', 'agregatePrices')  
  .addSeparator()
  .addItem('Построить лестницу от t_raw_job', 'buildStairs')
  .addSeparator()
  .addItem('Агрегация отчетов', 'groupStsReports')
  .addSeparator()
  .addItem('Удалить строки без работ', 'deleteEmptyJobs')
  .addItem('Единицы измерения', 'uniteExeptionsRules')  
  .addItem('Указать категорию', 'setSTDataGroupCategories')
  .addItem('КкР', 'rvRtJCalc')
  .addItem('КкМ', 'rvRtMCalc')  
  // .addItem('О/С', 'setOSParams')
  .addItem('Исключения', 'rvExeptionsRtJCalc');
}

function subUtilsMenu(){
  return SpreadsheetApp.getUi()
  .createMenu("Utils")  
  
  .addItem('Проставить нули в пустые клетки', 'fillEmptyCellsWithZeroValue');

}

function subSheetsTravelMenu(){
  return SpreadsheetApp.getUi()
  .createMenu("Перейти на лист =>")  
  .addItem('Карта таблицы', 'activateMapSheetSheet')
  .addItem('Листы настроек выгрузок', 'activateUploadConfigsSheet')
  .addItem('Листы с данными под табло', 'activateTableauDataListSheet')
  .addItem('Листы ведомостей', 'activateStsSheet');
}

function sheetsListsMenu(){
  return SpreadsheetApp.getUi()
  .createMenu("Сбор списка листов")  
  .addItem('Листы конфигураций', 'pasteStsSheetsList')
  .addItem('Листы t_ для табло', 'pasteStsSheetsList')
  .addItem('Листы ведомостей', 'pasteStsSheetsList');
}

function checkListMenu(){
  return SpreadsheetApp.getUi()
  .createMenu("Проверка расхождений checkList")
  .addItem('Неопределенные работы ведомостей', 'pasteUnexistedSTWorks')
  .addItem('Материалы из Ревит без материалов КЦ', 'pasteFMKCMaterialsMapping');
}

function configsMenu(){
  
  return SpreadsheetApp.getUi()
  .createMenu("Обрабатываемые конфигурационные листы")
  .addItem('Собрать вспомогательные материалы', 'uploadSubMaterials')
  .addItem('Проставить работу к сопутствующим материалам', 'sortSMaterials');

}