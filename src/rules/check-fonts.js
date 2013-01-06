/*global CSSLint*/
CSSLint.addRule({

    //rule information
    id: "check-fonts",
    name: "Check font alternatives",
    desc: "Check font alternatives for Mac OS (OS X, iOS)",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            macMap = {
                "Tahoma": "Geneva",
                "Lucida Console": "Monaco",
                "Lucida Sans Unicode": "Lucida Grande",
                "Palatino Linotype": "Palatino",
                "Book Antiqua": "Palatino",
                "Wingdings": "Zapf Dingbats",
                "MS Sans Serif": "Geneva",
                "MS Serif": "New York"
            };

        parser.addListener("property", function(event){

            var property = event.property,
                propertyName = property.text.toLowerCase(),
                valueParts = event.value.parts,
                currentRuleFonts = {},
                i, l, type, value, fontName, line, col;

            if(propertyName == "font" || propertyName == "font-family") {
                for(i = 0, l = valueParts.length; i < l; i++) {
                    value = valueParts[i];
                    type = value.type;
                    if(type == 'string' || type == 'identifier') {
                        fontName = value.text;
                        currentRuleFonts[fontName] = { line: value.line, col: value.col };
                    }
                }

                for(i in currentRuleFonts) {
                    if(currentRuleFonts.hasOwnProperty(i)) {
                        line = currentRuleFonts[i].line;
                        col = currentRuleFonts[i].col;
                        if(i in macMap && currentRuleFonts[macMap[i]] === undefined) {
                            reporter.warn("No MacOS-alternative for font '" + i + "'. " + 
                                          "Consider adding '" + macMap[i] + "'.", line, col, rule);
                        }
                    }
                }
            }
        });

    }

});