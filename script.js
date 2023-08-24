const cy = cytoscape({
  container: document.getElementById("cy"),
  // container to render in
  elements: [
    // list of graph elements to start with
    {
      // node a
      data: { id: "a" },
    },
    {
      // node b
      data: { id: "b" },
    },
    {
      // node c
      data: { id: "c" },
    },
    {
      // edge ab
      data: { id: "ab", source: "a", target: "b" },
    },
    {
      // edge ab
      data: { id: "ca", source: "c", target: "a" },
    },
  ],
  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(id)",
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
      },
    },
  ],
  zoomingEnabled: true,
  layout: {
    name: "grid",
    rows: 1,
  },
});

const addNodeBtn = document.querySelector(".add");

addNodeBtn.addEventListener("click", () => {
  cy.add({
    group: "nodes",
    data: { weight: 75 },
    position: { x: 200, y: 200 },
  });
});
