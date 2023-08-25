const addNodeBtn = document.querySelector(".addNode"); // add node button
const addEdgeBtn = document.querySelector(".addEdge"); // add edge button
const undoBtn = document.querySelector(".undo"); // undo button

var undoRedoOptions = {
  isDebug: false, // Debug mode for console messages
  actions: {}, // actions to be added
  undoableDrag: true, // Whether dragging nodes are undoable can be a function as well
  stackSizeLimit: undefined, // Size limit of undo stack, note that the size of redo stack cannot exceed size of undo stack
  ready: function () {
    // callback when undo-redo is ready
  },
};

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

const ur = cy.undoRedo(undoRedoOptions);

addNodeBtn.addEventListener("click", () => {
  cy.add({
    group: "nodes",
    data: { weight: 75 },
    position: { x: Math.random() * 600, y: Math.random() * 600 },
  });
});

addEdgeBtn.addEventListener("click", () => {
  let counter = 0;
  let startNodeId, endNodeId;
  alert("select start node");
  cy.on("tap", "node", function (evt) {
    counter++;
    switch (counter) {
      case 1:
        startNodeId = evt.target.id();
        alert("select end node");
        break;
      case 2:
        endNodeId = evt.target.id();
        cy.removeListener("tap");
        cy.add({
          group: "edges",
          data: { source: startNodeId, target: endNodeId },
        });
        break;
    }
  });
});

undoBtn.addEventListener("click", () => {
  console.log("undo , ur = ", ur);
  console.log("undostack = ", ur.getUndoStack());
});

// cy.on("click", "node", function (evt) {
//   var node = evt.target;
//   console.log("evt = ", evt);
//   console.log("tapped " + node.id());
// });
