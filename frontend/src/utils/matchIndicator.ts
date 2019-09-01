function check(s: string, regex: RegExp): boolean {
  if (s.match(regex)) {
    return true;
  }
  return false;
}

const md5Regex = /\b[A-Fa-f0-9]{32}\b/gi;
function isMD5(s: string): boolean {
  return check(s, md5Regex);
}

const sha1Regex = /\b[A-Fa-f0-9]{40}\b/gi;
function isSHA1(s: string): boolean {
  return check(s, sha1Regex);
}

const sha256Regex = /\b[A-Fa-f0-9]{64}\b/gi;
function isSHA256(s: string): boolean {
  return check(s, sha256Regex);
}

export function matchIndicator(
  indicator: string
): "MD5" | "SHA1" | "SHA256" | "OTHER" {
  if (isMD5(indicator)) return "MD5";
  if (isSHA1(indicator)) return "SHA1";
  if (isSHA256(indicator)) return "SHA256";
  return "OTHER";
}
