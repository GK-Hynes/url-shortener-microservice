const dns = require("dns");
const cypto = require("crypto");

function validateUrl() {
  // Remove protocol
  const protocolRegex = /^https?:\/\//i;
  const hostname = originalUrl.replace(protocolRegex, "");
  // Remove subdirectories
  const subDirectoryIndex = hostname.indexOf("/");
  const dnsUrl =
    subDirectoryIndex < 0 ? hostname : hostname.slice(0, subDirectoryIndex);

  dns.lookup(dnsUrl, (err) => {
    if (err === null) {
      res.json({ original_url: originalUrl, short_url: shortUrl });
    } else {
      console.log(err);
      res.send("Not a valid URL");
    }
  });
}

module.exports = validateUrl;
