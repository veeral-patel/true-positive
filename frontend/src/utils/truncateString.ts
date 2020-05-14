function truncateString(str: string, maxCharacters: number) {
  // Returns the first MAX_CHARACTERS characters of the string STR.
  if (str.length > maxCharacters) {
    return str.slice(0, maxCharacters) + "...";
  } else {
    return str;
  }
}

export default truncateString;
