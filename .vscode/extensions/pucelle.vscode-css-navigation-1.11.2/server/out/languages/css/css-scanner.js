"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSScanner = void 0;
const simple_selector_1 = require("../common/simple-selector");
const text_scanner_1 = require("../common/text-scanner");
const css_service_1 = require("./css-service");
const css_range_parser_1 = require("./css-range-parser");
const file_1 = require("../../helpers/file");
const vscode_uri_1 = require("vscode-uri");
class CSSScanner extends text_scanner_1.TextScanner {
    supportsNesting;
    startOffset;
    constructor(document, offset) {
        super(document, offset);
        this.supportsNesting = css_service_1.CSSService.isLanguageSupportsNesting(document.languageId);
        this.startOffset = offset;
    }
    /** Scan CSS selectors in a CSS document from specified offset. */
    scanForSelector() {
        let match = this.match(/(?<identifier>[#.&])([\w-]+)/g);
        if (!match) {
            return null;
        }
        let identifier = match.groups.identifier;
        if (identifier === '.' || identifier === '#') {
            let selector = simple_selector_1.SimpleSelector.create(identifier + match.text, match.index);
            return selector ? [selector] : null;
        }
        if (this.supportsNesting && identifier === '&') {
            return this.parseAndGetSelectors(match.text, match.index);
        }
        return null;
    }
    /** Parse whole ranges for document and get selector. */
    parseAndGetSelectors(word, wordLeftOffset) {
        let { ranges } = new css_range_parser_1.CSSRangeParser(this.document).parse();
        let currentRange;
        let selectorIncludedParentRange;
        // Binary searching should be better, but not help much.
        for (let i = 0; i < ranges.length; i++) {
            let range = ranges[i];
            let start = this.document.offsetAt(range.range.start);
            let end = this.document.offsetAt(range.range.end);
            // Is a ancestor and has selector
            if (this.startOffset >= start && this.startOffset < end) {
                if (currentRange && this.isRangeHaveSelector(currentRange)) {
                    selectorIncludedParentRange = currentRange;
                }
                currentRange = range;
            }
            if (this.startOffset < start) {
                break;
            }
        }
        if (!selectorIncludedParentRange) {
            return null;
        }
        let selectors = [];
        for (let { full } of selectorIncludedParentRange.names) {
            if (full[0] === '.' || full[0] === '#') {
                let selector = simple_selector_1.SimpleSelector.create(full + word, wordLeftOffset);
                if (selector) {
                    selectors.push(selector);
                }
            }
        }
        return selectors;
    }
    /** Checks whether range having a selector. */
    isRangeHaveSelector(range) {
        return range.names.some(({ mains }) => mains !== null);
    }
    /** Scan for relative import path. */
    async scanForImportPath() {
        let importPath = this.match(/@import\s*['"](.*?)['"]\s*;/g)?.text;
        if (importPath) {
            return await (0, file_1.resolveImportPath)(vscode_uri_1.URI.parse(this.document.uri).fsPath, importPath);
        }
        return null;
    }
}
exports.CSSScanner = CSSScanner;
//# sourceMappingURL=css-scanner.js.map