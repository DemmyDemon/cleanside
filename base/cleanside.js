
var cleanSide = {
    filters : {},
    sections : ["handelseflode","responser","nytt","tradar"],
    applyFilter : function(element,filterName){
        element.classList.remove("csBlur","csDesat","csBoth");
        if (filterName !== 'none'){
            element.classList.add(filterName);
        }
    },
    getFilter : function(section){
        var filter = cleanSide.filters[section] || 'csBlur';
        return filter;
    },
    loadFilters : function(){
        var loader = browser.storage.local.get(cleanSide.sections)
        .then(cleanSide.doneLoadingFilters,cleanSide.errorHandler);
        return loader;
    },
    doneLoadingFilters : function(result){
        cleanSide.filters = result;
    },
    errorHandler : function(error){
        // Not very sophisticated...
        console.log(`Error: ${error}`);
    },
    storeFilters : function(blob){
        browser.storage.local.set(blob);
    },
    doCleanup : function() {
        var href = window.location.href;
        var context;
        if (href.match(/\/feed.php/)){
            context = 'handelseflode';
            cleanSide.cleanStandardContext(context);
        }
        else if (href.match(/\/alerts.php\?act=responses/)){
            context = 'responser';
            cleanSide.cleanStandardContext(context);
        }
        else if (href.match(/\/alerts.php\?act=material/)){
            context = 'nytt';
            cleanSide.cleanStandardContext(context);
        }
        else if (href.match(/\/net\/\?discussion/)){
            context = 'tradar';
            cleanSide.cleanComplexContext(context);
        }
        else {
            // console.log(href+' - Not touching that!');
        }

    },
    cleanStandardContext : function (context){
        var filter = cleanSide.getFilter(context);
        // console.log('Standard context '+context+' has filter '+filter);
        document.querySelectorAll('#v5maincontents a[href^="g.php"] > img').forEach(function(element){
            cleanSide.applyFilter(element,filter);
        });
        document.querySelectorAll('#v5maincontents a[href^="/net/"] > img').forEach(function(element){
            cleanSide.applyFilter(element,filter);
        });
    },
    cleanComplexContext : function (context){
        var filter = cleanSide.getFilter(context);
        // console.log("complex context "+context+" has filter "+filter);
        document.querySelectorAll('#v5maincontents .fcell2 img').forEach(function(element){
            cleanSide.applyFilter(element,filter);
        });
    }
};

cleanSide.loadFilters().then(cleanSide.doCleanup);