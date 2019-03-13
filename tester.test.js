const {MEANING_OF_LIFE, sayThat, Tile} = require("./tester");

test("2 should be 2", () => expect(2).toBe(2));
test("Imported constant should have proper value", () => expect(MEANING_OF_LIFE).toBe(42));
test("Imported function should work", () => expect(sayThat('just wow')).toBe('That is just wow.'));
test("Imported Tile should be of type object", () => expect(typeof(new Tile())).toBe('object'));
