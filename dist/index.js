#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const prompts = require('prompts');
const fs = require('fs');
(() => __awaiter(this, void 0, void 0, function* () {
    const response = yield prompts({
        type: 'text',
        name: 'value',
        message: 'What folder would you like to install Starbase in?',
        validate: (value) => {
            if (!value)
                return 'This is not a valid folder name.';
            try {
                // Check if the directory exists
                if (fs.existsSync(value) && fs.lstatSync(value).isDirectory()) {
                    const files = fs.readdirSync(value);
                    if (files.length > 0) {
                        return 'This folder is not empty.';
                    }
                    return true;
                }
            }
            catch (err) {
                return 'Error checking directory existence -- this is usually a permissions issue.';
            }
            return true;
        },
    });
    console.log(`This folder is good! (${response.value})`);
}))();
//# sourceMappingURL=index.js.map