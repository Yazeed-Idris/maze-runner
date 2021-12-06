import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  graph = [
    [1, 4],
    [0, 2],
    [1, 3, 6],
    [2, 7],
    [0],
    [6, 9],
    [5, 2],
    [3, 11],
    [9, 12],
    [5, 8, 10],
    [9, 14],
    [7],
    [8],
    [14],
    [10, 13],
    []
  ]

  mazeCode = ``;

  ngOnInit(): void {
    console.log(this.graph);
  }

  generateBoard(graph: any[]): string {

    const sizeN = (Math.sqrt(graph.length))
    let mazeCode: string = `<table>`;

    for (let i = 0; i < sizeN; i++) {
      mazeCode = mazeCode + `<tr>`
      for (let j = 0; j < sizeN; j++) {

        let baseNStr: string = i + '' + j;
        let index = parseInt(baseNStr, sizeN);

        let topNode = index - sizeN;
        let leftNode = index - 1;
        let rightNode = index + 1;
        let bottomNode = index + sizeN;
        let clasesStr = ``

        if (graph[index].indexOf(topNode) > -1) {
          clasesStr = clasesStr + 'no-border-top ';
        }
        if (graph[index].indexOf(leftNode) > -1) {
          clasesStr = clasesStr + 'no-border-left ';
        }
        if (graph[index].indexOf(rightNode) > -1) {
          clasesStr = clasesStr + 'no-border-right '
        }
        if (graph[index].indexOf(bottomNode) > -1) {
          clasesStr = clasesStr + 'no-border-bottom ';
        }
        if (graph[index].indexOf('x') > -1) {
          clasesStr = clasesStr + 'visited';
        }

        mazeCode = mazeCode + `<td class="${clasesStr}">${index}</td>`
      }
      mazeCode = mazeCode + `</tr>`
    }
    mazeCode += `</table>`

    this.mazeCode = mazeCode;
    return mazeCode;
  }

  generateRandomGraph(size: number) {
    const nSquare = size * size;

    let graph = new Array(nSquare);
    for (let i = 0; i < graph.length; i++) {
      graph[i] = [];
    }

    graph[0].push(1);
    graph[1].push(0);

    const nodeIndices = this.getNodeIndices(size);

    for (let i = 0; i < nodeIndices.midNodes.length; i++) {

      let randomChoice = Math.floor(Math.random() * 4);

      switch (randomChoice) {
        case 0:
          graph[nodeIndices.midNodes[i]].push(nodeIndices.midNodes[i] - 1);
          graph[nodeIndices.midNodes[i] - 1].push(nodeIndices.midNodes[i]);
          break;
        case 1:
          graph[nodeIndices.midNodes[i]].push(nodeIndices.midNodes[i] + 1);
          graph[nodeIndices.midNodes[i] + 1].push(nodeIndices.midNodes[i]);
          break;
        case 2:
          graph[nodeIndices.midNodes[i]].push(nodeIndices.midNodes[i] + size);
          graph[nodeIndices.midNodes[i] + size].push(nodeIndices.midNodes[i]);
          break;
        case 3:
          graph[nodeIndices.midNodes[i]].push(nodeIndices.midNodes[i] - size);
          graph[nodeIndices.midNodes[i] - size].push(nodeIndices.midNodes[i]);
          break;
      }
    }

    for (let i = 0; i < nodeIndices.topEdges.length; i++) {

      let randomChoice1 = Math.floor(Math.random() * 3);

      switch (randomChoice1) {
        case 0:
          graph[nodeIndices.topEdges[i]].push(nodeIndices.topEdges[i] + 1);
          graph[nodeIndices.topEdges[i] + 1].push(nodeIndices.topEdges[i]);
          break;
        case 1:
          graph[nodeIndices.topEdges[i]].push(nodeIndices.midNodes[i] - 1);
          graph[nodeIndices.topEdges[i] - 1].push(nodeIndices.topEdges[i]);
          break;
        case 2:
          graph[nodeIndices.topEdges[i]].push(nodeIndices.topEdges[i] + size);
          graph[nodeIndices.topEdges[i] + size].push(nodeIndices.topEdges[i]);
          break;
      }
    }

    for (let i = 0; i < nodeIndices.bottomEdges.length; i++) {

      let randomChoice = Math.floor(Math.random() * 3);

      switch (randomChoice) {
        case 0:
          graph[nodeIndices.bottomEdges[i]].push(nodeIndices.bottomEdges[i] + 1);
          graph[nodeIndices.bottomEdges[i] + 1].push(nodeIndices.bottomEdges[i]);
          break;
        case 1:
          graph[nodeIndices.bottomEdges[i]].push(nodeIndices.bottomEdges[i] - 1);
          graph[nodeIndices.bottomEdges[i] - 1].push(nodeIndices.bottomEdges[i]);
          break;
        case 2:
          graph[nodeIndices.bottomEdges[i]].push(nodeIndices.bottomEdges[i] - size);
          graph[nodeIndices.bottomEdges[i] - size].push(nodeIndices.bottomEdges[i]);
          break;
      }
    }

    for (let i = 0; i < nodeIndices.leftEdges.length; i++) {

      let randomChoice = Math.floor(Math.random() * 3);

      switch (randomChoice) {
        case 0:
          graph[nodeIndices.leftEdges[i]].push(nodeIndices.leftEdges[i] + 1);
          graph[nodeIndices.leftEdges[i] + 1].push(nodeIndices.leftEdges[i]);
          break;
        case 1:
          graph[nodeIndices.leftEdges[i]].push(nodeIndices.leftEdges[i] + size);
          graph[nodeIndices.leftEdges[i] + size].push(nodeIndices.leftEdges[i]);
          break;
        case 2:
          graph[nodeIndices.bottomEdges[i]].push(nodeIndices.bottomEdges[i] - size);
          graph[nodeIndices.bottomEdges[i] - size].push(nodeIndices.bottomEdges[i]);
          break;
      }
    }

    for (let i = 0; i < nodeIndices.rightEdges.length; i++) {

      let randomChoice = Math.floor(Math.random() * 3);

      switch (randomChoice) {
        case 0:
          graph[nodeIndices.rightEdges[i]].push(nodeIndices.rightEdges[i] - 1);
          graph[nodeIndices.rightEdges[i] - 1].push(nodeIndices.rightEdges[i]);
          break;
        case 1:
          graph[nodeIndices.rightEdges[i]].push(nodeIndices.rightEdges[i] + size);
          graph[nodeIndices.rightEdges[i] + size].push(nodeIndices.rightEdges[i]);
          break;
        case 2:
          graph[nodeIndices.rightEdges[i]].push(nodeIndices.rightEdges[i] - size);
          graph[nodeIndices.rightEdges[i] - size].push(nodeIndices.rightEdges[i]);
          break;
      }
    }
    return graph;
  }

  private getNodeIndices(size: number) {

    const topLeft = 0;
    const topRight = size - 1;
    const bottomLeft = size * size - size;
    const bottomRight = size * size - 1;

    let topEdges = [];
    for (let i = 1; i < size - 1; i++) {
      topEdges.push(i);
    }

    let leftEdges = [];
    for (let i = size; i < bottomLeft; i += size) {
      leftEdges.push(i);
    }

    let bottomEdges = [];
    for (let i = bottomLeft + 1; i < bottomRight; i++) {
      bottomEdges.push(i);
    }

    let rightEdges = [];
    for (let i = ((size * 2) - 1); i < bottomRight; i += size) {
      rightEdges.push(i);
    }

    let midNodes = [];
    for (let i = 1; i < size - 1; i++) {
      for (let j = ((i * size) + 1); j < (((i * size) + size) - 1); j++) {
        midNodes.push(j);
      }
    }
    return {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      topEdges,
      rightEdges,
      bottomEdges,
      leftEdges,
      midNodes,
    }
  }

  breadthFirstSearch(start: any, end: any, graph: any[]) {
    const queue = [start];
    const visited = new Set();

    while (queue.length > 0) {
      const node = queue.shift();
      const destinations: any[] = graph[node];

      for (let destination of destinations) {

        if (typeof destination === "number") {

          graph[destination].push('x');
          if (destination === end) {
            console.log('success');
            break;
          }

          if (!visited.has(destination)) {
            visited.add(destination);
            queue.push(destination);
          }
        }
      }
    }
    this.graph = graph;
    this.generateBoard(this.graph);
  }

  generateNewBoard() {
    this.graph = this.generateRandomGraph(5);
    this.generateBoard(this.graph);
  }

}
