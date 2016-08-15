angular.module('cafapi', ['cafapi.templates'])
    .service('$localizeService', localizeService)
    .controller('MainCtrl', ['$localizeService', '$templateCache', '$sce', MainCtrl])
    .directive('localizeText', ['$localizeService', localizeText]);

function MainCtrl(localizeService, $templateCache, $sce) {
    var vm = this;

    // get some of the json values
    var json = localizeService.getServicesJson();
    var active_language = localizeService.getActiveLanguage();

    // get a localized version of the header
    var localized_introduction = localizeService.getLocalised(json.introduction, active_language);

    // get the header markdown
    var introduction_md = $templateCache.get(localized_introduction);

    // parse markdown
    vm.introduction = $sce.trustAsHtml(markdown.toHTML(introduction_md));

    // get localized versions of all the services
    vm.services = Object.keys(json.services).map(function(index) {
        // get an localized version of the service
        var localized = localizeService.getLocalised(json.services[index], active_language);

        // get the markdown
        var md = $templateCache.get(localized.content);

        // if template loading fails for some odd reason
        if(!md) {
            localized.content = "";
            return localized;
        }

        // parse markdown
        localized.content = $sce.trustAsHtml(markdown.toHTML(md));

        return localized;
    });

    var sideToggle = true;

    vm.imageSide = function() {

        // toggle the side
        sideToggle = !sideToggle;

        // return the correct side of the image
        return sideToggle ? 'left' : 'right';
    };
}

function localizeText($localizeService) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {

            // store a reference to the native element
            var nativeElement = element[0];            

            // get the text 
            var text = attrs.localizeText;

            // find localized version
            var localization_json = $localizeService.getLocalizeJson();

            // attempt to find language specific string
            var language_strings = $localizeService.getLocalised(localization_json, $localizeService.getActiveLanguage());

            // find the matching string
            var matching_string = language_strings[text];

            // if no matching strings are found try finding in the default language 
            if (!matching_string) {

                // look up the default language
                language_strings = $localizeService.getLocalised(localization_json, $localizeService.getDefaultLanguage());

                // find the matching string
                matching_string = language_strings[text];
            }

            // set the inner text here
            nativeElement.innerHTML = matching_string;
        }
    };
}

function localizeService() {
    var vm = this;

    // find the script elements containing the json
    var localization_script_tag = document.querySelector('#localization_json');
    var services_script_tag = document.querySelector('#showcase_json');

    // get the contents of the script tags
    var localization_json = JSON.parse(localization_script_tag.innerHTML);
    var services_json = JSON.parse(services_script_tag.innerHTML);

    // store the default language
    var default_language = 'en-us';

    // store the active language
    var active_language = null;

    // check if a language has been previously selected
    if (localStorage.getItem('cafapi_language')) {
        // get the stored previously selected language
        active_language = localStorage.getItem('cafapi_language');
    } else {
        // if no language has previously been selected, use the default
        active_language = default_language;
    }

    vm.getServicesJson = function() {
        return services_json;
    };

    vm.getLocalizeJson = function() {
        return localization_json;
    };

    vm.getActiveLanguage = function() {
        return active_language;
    };

    vm.getDefaultLanguage = function() {
        return default_language;
    };

    vm.setActiveLanguage = function(language) {
        // store the active language
        active_language = language;

        // store new language in local storage
        localStorage.setItem('cafapi_language', language);
    };

    vm.getLocalised = function(path, language) {

        // if a localized version exists
        if (path.hasOwnProperty(language)) return path[language];

        // otherwise return the default language
        return path[default_language];
    };

}