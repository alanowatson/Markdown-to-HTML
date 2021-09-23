/*

# Implement a Markdown => HTML converter

Markdown is a simple syntax used to generate formatted text. It’s used in lots
of places, but the one most developers have probably encountered is README
files in GitHub.

For this exercise, we’d like you to write a program that converts a small
subset of markdown to HTML. You can implement this as a command-line program
or as a web application, whatever you’re more comfortable with.

You can use **any language of your choice.** Please don't feel the need to impress us with a language we use - we really want you to pick the language you feel most comfortable with so you can put your best foot forward.


## Formatting Specifics

Markdown is a fairly rich specification; for this assignment, we’re only
looking for a small subset. This is the formatting we’d like you to implement:

| Markdown                               | HTML                                              |
| -------------------------------------- | ------------------------------------------------- |
| `# Heading 1`                          | `<h1>Heading 1</h1>`                              |
| `## Heading 2`                         | `<h2>Heading 2</h2>`                              |
| `...`                                  | `...`                                             |
| `###### Heading 6`                     | `<h6>Heading 6</h6>`                              |
| `Unformatted text`                     | `<p>Unformatted text</p>`                         |
| `[Link text](https://www.example.com)` | `<a href="https://www.example.com">Link text</a>` |
| `Blank line`                           | `Ignored`                                         |


## Some tests

Here are a few sample inputs. Your code should, of course, work with
any input that uses the formatting rules above, but you can use this
sample to get started testing.

MAKE TESTS
3 BIG PROBLEMS
!) Accessing the .md file and parsing through the data.
1) HEADERS
2) FINDING ENDPOINT OF TAG. SINGLE LINE SPACE VS DOUBLE
3) INLINE LINKS FINDING START, END AND SYNTAX
*/

const conversion = (aStr) => {
  const splittedDouble = aStr.split('\n\n');
  const finalString = splittedDouble.map((line) => inspectLines(line));
  return finalString.join('\n');
};

const inspectLines = (line) => {
  let convertedLine;
  if (line[0] === '#') {
    convertedLine = headerConverter(line);
  } else {
    convertedLine = paragraphConverter(line);
  }
  return convertedLine;
};

const headerConverter = (headerLine) => {

  let hNumSliceIndex = getNumHashtags(headerLine);
  let returnString = headerLine.slice(hNumSliceIndex);
  if (headerLine[hNumSliceIndex] === ' ') {
    returnString = headerLine.slice(hNumSliceIndex + 1);
  }

  if (
    headerLine.includes('](') &&
    headerLine.includes('[') &&
    headerLine.includes(')')
  ) {
    returnString = inlineConversion(returnString);
  }
  return `<h${hNumSliceIndex}>${returnString}</h${hNumSliceIndex}>`;
};

const paragraphConverter = (paragrahLine) => {
  let returnString;
  if (
    paragrahLine.includes('](') &&
    paragrahLine.includes('[') &&
    paragrahLine.includes(')')
  ) {
    returnString = `<p>${inlineConversion(paragrahLine)}</p>`;
  } else {
    returnString = `<p>${paragrahLine}</p>`;
  }
  return returnString;
};

const getNumHashtags = (line) => {
  let countAndIdx = 0;
  while (line[countAndIdx] === '#') {
    countAndIdx++;
  }
  return countAndIdx;
};

const inlineConversion = (line) => {
  const splitBegIndex = line.indexOf('[');
  const splitEndIndex = line.indexOf(')') + 1;
  const beginningStr = line.slice(0, splitBegIndex);
  const inlineLink = line.slice(splitBegIndex, splitEndIndex);


  let endStr = line.slice(splitEndIndex);

  let finalDataArray = inlineLink.split('](');
  let linkText = finalDataArray[0].slice(1);
  let address = finalDataArray[1].slice(0, -1);
  let returnAnchor = `<a href="${address}">${linkText}</a>`;

  if (endStr.includes('](') && endStr.includes('[') && endStr.includes(')')) {
    endStr = inlineConversion(endStr);
  }
  return `${beginningStr}${returnAnchor}${endStr}`;
};

module.exports = conversion;
