import _ from 'lodash';

var CatTranslator = {
    // This is the only function exposed in CatServiceHelper.
    // It takes a raw 'pet' object returned from the PetFinder API
    // and converts it into a Cat object.
    translateCat : function translateCat(catObj) {
        var cat = {};
        cat.pics = [];
        cat.id = getCattribute(catObj,'id');
        cat.name = getCattribute(catObj,'name');
        cat.description = getCattribute(catObj,'description');
        cat.sex = getCattribute(catObj,'sex') === "M" ? "Male" : "Female";
        cat.age = getCattribute(catObj,'age');
        cat.size = getSize(catObj.size.$t);
        cat.breed = getBreeds(catObj.breeds);
        cat.thumbnail = getThumb(catObj.media.photos.photo);
        cat.pics = getPics(catObj.media.photos.photo);
        cat.options = getOptions(catObj.options.option);
        return cat;
    }
};

// Concats the breeds into a single string.
var getBreeds = function getBreeds(breeds) {
    var breedName = "";
    if(_.isArray(breeds.breed)) {
        _.forEach(breeds.breed, function (item) {
            breedName += item['$t'] + " ";
        });
    } else {
        breedName = breeds.breed['$t'] || " ";
    }
    return breedName;
};


var getCattribute = function(cat, key) {
    if ( key in cat && cat[key].$t ) {
        return cat[key].$t;
    }
    return '';
}

// Gets a single thumbnail from the list of available pictures.
var getThumb = function getThumb(photoArray){
    var thumbs = _.filter(photoArray, {"@size":"fpm","@id":"1"});
    return thumbs.length >= 1 ? thumbs[0].$t : '';
};

// Gets one of each available picture (the x-large version)
var getPics = function getPics(photoArray){
    var picUrls = [];
    var thumbs = _.filter(photoArray, {"@size":"x"});
    if(thumbs.length) {
        picUrls = thumbs.map( (item) => item.$t );
    }
    return picUrls;
};

// Converts size data into readable strings.
var getSize = function getSize(size){
    var sizes = {S: "Small",L: "Large",M: "Medium"};
    return sizes[size] || "";
};

// Gets 'options' from the pet data and concats them
var getOptions = function getOptions(option) {
    var options = '';
    var optionTable = {
        altered: "Spayed/Neutered",
        noDogs: "No Dogs",
        noKids: "No Kids",
        specialNeeds: "Special Needs",
        noClaws: "Declawed"
    };

    if ( _.isArray(option) ) {
        options = option.map( (opt) => optionTable[opt.$t] ).join(', ');
    } else if ( _.isObject(option) ){
        options = optionTable[option.$t];
    }

    return options;
};

export default CatTranslator;