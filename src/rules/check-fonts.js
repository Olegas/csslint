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
            },
            fontFaceRule = false;

        // Disable checking inside @font-face block
        parser.addListener("startfontface", function(){
            fontFaceRule = true;
        });

        parser.addListener("endfontface", function(){
            fontFaceRule = false;
        });

        parser.addListener("property", function(event){

            var property = event.property,
                propertyName = property.text.toLowerCase(),
                valueParts = event.value.parts,
                currentRuleFonts = {},
                i, l, value, line, col;

            if(fontFaceRule) {
                return;
            }

            if(propertyName == "font" || propertyName == "font-family") {
                for(i = 0, l = valueParts.length; i < l; i++) {
                    value = valueParts[i];
                    if(value.type == 'identifier') {
                        currentRuleFonts[value.text] = { line: value.line, col: value.col };
                    }
                }
console.log(currentRuleFonts);
                for(i in currentRuleFonts) {
                    if(currentRuleFonts.hasOwnProperty(i)) {
                        if(i in macMap && currentRuleFonts[macMap[i]] === undefined) {
                            line = currentRuleFonts[i].line;
                            col = currentRuleFonts[i].col;
                            reporter.warn("No MacOS-alternative for font '" + i + "'. " + 
                                          "Consider adding '" + macMap[i] + "'.", line, col, rule);
                        }
                    }
                }
            }
        });

    }

});