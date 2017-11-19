function saveSettings(event){
    event.preventDefault();
    //console.log("Saaaave!");
    var current = {};
    for (sectionId in cleanSide.sections){
        var section = cleanSide.sections[sectionId];
        current[section] = document.forms["settings"]["style_"+section].value;
    }
    cleanSide.storeFilters(current);
}
function updateFiskbild(event){
    var filter = event.target.value;
    //console.log(filter);
    var fiskbild = document.querySelector('#'+event.target.dataset.for);
    cleanSide.applyFilter(fiskbild,filter);
}


function restoreSettings(){
    //console.log("Restore settings in progress");

    var settings = document.querySelector("#settings");
    settings.addEventListener("submit",saveSettings);

    document.querySelectorAll("input[type='radio']").forEach(function(){
        this.addEventListener("change",updateFiskbild);
    });
    cleanSide.loadFilters().then(function(result){
        for (sectionId in cleanSide.sections){
            var section = cleanSide.sections[sectionId];
            var filter = cleanSide.getFilter(section);
            // console.log(section+' '+filter);
            var radio = document.forms["settings"]["style_"+section];
            radio.value = filter;
            var fisk = document.querySelector("#fisk_"+section);
            cleanSide.applyFilter(fisk,filter);
        }
    });

}

document.addEventListener("DOMContentLoaded",restoreSettings);