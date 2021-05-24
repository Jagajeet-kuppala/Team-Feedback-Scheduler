function globalSetting(){
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty('DUMMY_USER','dummy@domain.com');
}