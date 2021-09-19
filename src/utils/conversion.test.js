const conversion = require('./conversion');

test('splits a double spaced string', () => {
  expect(
    conversion(`happy

  birthday

  buddy`)
  ).toBe(`<h1>happy</h1>
    <p>birthday</p>
    <p>buddy</p>`);
});

test('converts an h1 heading', () => {
  expect(conversion('# Heading 1')).toBe('<h1>Heading 1</h1>');
});

test('converts multiline text h1', () => {
  expect(
    conversion(`Hello there

How are you?
What's going on?`)
  ).toBe(`<p>Hello there</p>

<p>How are you?
What's going on?</p>`);
});

test('converts a paragraph inline link', () => {
  expect(
    conversion(
      `This is a paragraph [with an inline link](http://google.com). Neat, eh?`
    )
  ).toBe(
    `<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?</p>`
  );
});

test('converts a heading inline link', () => {
  expect(
    conversion(`## This is a header [with a link](http://yahoo.com)`)
  ).toBe(
    `<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>`
  );
});
