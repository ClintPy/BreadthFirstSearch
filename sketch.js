
let data;
let graph;
let dropdown;
function preload() {
  data = loadJSON('kevinbacon.json');
}

function setup() {
  graph = new Graph();
  dropdown = createSelect();
  dropdown.changed(bfs);
  noCanvas();
  let movies = data.movies;

  movies.map(m => {
    let movie = m.title;
    let cast = m.cast;
    let movieNode = new Node(movie)
    graph.addNode(m)

    cast.map(c => {
      let actor = c;
      let actorNode = graph.getNode(actor);
      if (actorNode == undefined) {
        actorNode = new Node(actor);
        dropdown.option(actor);
      }
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    });
  });
}

function bfs() {
  graph.reset();
  let start = graph.setStart(dropdown.value());
  let end = graph.setEnd('Kevin Bacon');

  console.log(graph);


  let queue = [];
  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    let current = queue.shift();
    if (current == end) {
      console.log("Found " + current.value);
      break;
    }
    let edges = current.edges;
    edges.map(e => {
      let neighbor = e;
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    })

  }
  let path = [];
  path.push(end);
  let next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }
  let txt = '';
  for (let i = path.length - 1; i >= 0; i--) {
    let n = path[i];
    txt += n.value + '-->'
  }
  createP(txt);

}