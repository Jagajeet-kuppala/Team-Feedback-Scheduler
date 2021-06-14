function globalSettings(){
    const userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty('DUMMY_USER','dummy@domain.com');
    userProperties.setProperty('MIN_SPEEDBACK_SLOT_MINUTES',2);
    userProperties.setProperty('MAX_SPEEDBACK_SLOT_MINUTES',10);
}
