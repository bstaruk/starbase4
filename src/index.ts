#!/usr/bin/env node
const prompts = require('prompts');
import { green, yellow } from 'picocolors';
const fs = require('fs');

(async () => {
  const questions = [
    {
      type: 'text',
      name: 'value',
      message: 'What folder would you like to install Starbase in?',
      validate: (value: string) => {
        if (!value) return 'This is not a valid folder name.';

        try {
          // Check if the directory exists
          if (fs.existsSync(value) && fs.lstatSync(value).isDirectory()) {
            const files = fs.readdirSync(value);

            if (files.length > 0) {
              return 'This folder is not empty.';
            }

            return true;
          }
        } catch (err) {
          return 'Error checking directory existence -- this is usually a permissions issue.';
        }

        return true;
      },
    },
  ];

  const onCancel = () => {
    console.log(yellow('Starbase initialization cancelled!') + '\n');
    return true;
  };

  const response = await prompts(questions, { onCancel });

  if (response.value) {
    console.log(green(`Starbase has been installed in "${response.value}"`) + '\n');
  }
})();
