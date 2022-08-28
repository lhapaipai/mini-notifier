export function ucfirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function snakeToPascal(string: string) {
  return string
    .split("-")
    .map((str: string) => {
      return ucfirst(str.split("/").map(ucfirst).join("/"));
    })
    .join("");
}
