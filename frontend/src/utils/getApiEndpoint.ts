function getApiEndpoint(): string {
  if (process.env.NODE_ENV === "development") return "http://localhost:4000";
  return "https://api.truepositive.app";
}

export { getApiEndpoint };
