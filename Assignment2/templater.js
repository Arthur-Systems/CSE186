/*
#######################################################################
#
# Copyright (C) 2020-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

/**
 * CSE186 Assignment 2
 *
 * Simple templated tag-replacement
 */
class Templater {
  /**
     * Create a templater
     * @param {string} template - A {{ }} tagged string
     */
  constructor(template) {
    this.template = template;
  }

  /**
     * Apply map to template to generate string
     * @param {object} map Object with propeties matching tags in template
     * @param {boolean} strict Throw an Error if any tags in template are
     *     not found in map
     * @return {string} template with all tags replaced
     * @throws An Error if strict is set and any tags in template are not
     *     found in map
     */
  apply(map, strict) {
    if (this.template === undefined) {
      return undefined;
    }
    let result = this.template;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions - JavaScript | MDN
    const matches = this.template.match(/{{\s*\w+\s*}}/g);
    if (matches) {
      matches.forEach((match) => {
        const tag = RegExp(/{{\s*(\w+)\s*}}/).exec(match)[1];
        const value = map[tag];
        if (value !== undefined) {
          result = result.replace(match, value);
        } else if (strict) {
          throw new Error(`Missing tag ${tag} in map`);
        } else {
          result = result.replace(match, '');
          result = result.replace('  ', ' ');
        }
      });
    }
    return result;
  }
}

module.exports = Templater;
