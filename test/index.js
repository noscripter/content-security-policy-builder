var builder = require("..");

var assert = require("assert");

describe("builder", function () {
  it("builds empty directives", function () {
    var result = builder({
      directives: {}
    });

    assert.equal(result, "");
  });

  it("builds directives with camelCased keys", function () {
    var result = builder({
      directives: {
        whatThe: "heck",
        defaultSrc: "'self'",
        playtimeIsOver: ["star", "fox"]
      }
    });

    var split = result.split("; ");

    assert.equal(split.shift(), "default-src 'self'");

    split.sort();
    assert.equal(split.length, 2);
    assert.equal(split[0], "playtime-is-over star fox");
    assert.equal(split[1], "what-the heck");
  });

  it("builds directives with dash-separated keys", function () {
    var result = builder({
      directives: {
        "do-a": "barrel roll",
        "default-src": "'self'",
        "andross-has-ordered-us": ["to", "take", "you", "down"]
      }
    });

    var split = result.split("; ");

    assert.equal(split.shift(), "default-src 'self'");

    split.sort();
    assert.equal(split.length, 2);
    assert.equal(split[0], "andross-has-ordered-us to take you down");
    assert.equal(split[1], "do-a barrel roll");
  });

  it("builds directives with a mix of key types", function () {
    var result = builder({
      directives: {
        "hey-einstein": "i'm on your side",
        defaultSrc: "'self'",
        falco: ["lombardi"]
      }
    });

    var split = result.split("; ");

    assert.equal(split.shift(), "default-src 'self'");

    split.sort();
    assert.equal(split.length, 2);
    assert.equal(split[0], "falco lombardi");
    assert.equal(split[1], "hey-einstein i'm on your side");
  });
});
