function findDimensions(
  surfaceArea,
  l = 1,
  b = 1,
  h = 1,
  dimensions = new Set(),
  combinations = []
) {
  const factor = surfaceArea / 2;
  const currentArea = l * b + b * h + l * h;

  if (currentArea === factor) {
    // Sort the dimensions before adding them to the set to handle different orderings.
    const sortedDimensions = [l, b, h].sort((a, b) => a - b);

    if (!dimensions.has(sortedDimensions.join(","))) {
      dimensions.add(sortedDimensions.join(","));
      combinations.push({ Length: l, Breadth: b, Height: h });
    }
  }

  if (currentArea >= factor || l * b * h > surfaceArea) {
    return combinations;
  }

  findDimensions(surfaceArea, l + 1, b, h, dimensions, combinations);
  findDimensions(surfaceArea, l, b + 1, h, dimensions, combinations);
  findDimensions(surfaceArea, l, b, h + 1, dimensions, combinations);
  return combinations;
}

document.getElementById("submit").addEventListener("click", () => {
  document.getElementById("submit").disabled = true;
  const dimensions = findDimensions(document.getElementById("tsa").value);
  console.log("Dimensions: ", dimensions);
  if (Array.isArray(dimensions) && dimensions.length) {
    document.getElementById("results").innerHTML = `For <b>${
      document.getElementById("tsa").value
    }</b>: <br/>`;
    dimensions.map((dimension) => {
      document.getElementById(
        "results"
      ).innerHTML += `Length: ${dimension.Length}, Breadth: ${dimension.Breadth}, Height: ${dimension.Height} <br>`;
    });
  } else {
    document.getElementById("results").innerHTML = "No dimensions found";
  }
  document.getElementById("submit").disabled = false;
});

document.getElementById("tsa").addEventListener("input", () => {
  if (document.getElementById("tsa").value !== "0") {
    document.getElementById("emphasis").innerHTML = `${
      document.getElementById("tsa").value
    }<sup>3</sup>! ... Around <${Math.pow(
      document.getElementById("tsa").value,
      3
    )} tests!`;
  }
});
