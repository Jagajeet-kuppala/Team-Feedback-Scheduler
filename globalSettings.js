function globalSettings(){
    const userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty('DUMMY_USER','dummy@domain.com');
}
