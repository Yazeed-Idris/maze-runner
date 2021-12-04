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
    [7, 15],
    [8],
    [14],
    [10, 13],
    [11]
  ]

  mazeCode = ``;

  ngOnInit(): void {
    this.graph = this.generateRandomGraph(7)
    this.mazeCode = this.generateBoard(this.graph);
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
        let leftNode = index - 1 ;
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
          clasesStr = clasesStr + 'no-border-bottom';
        }
        mazeCode = mazeCode + `<td class="${clasesStr}">${index}</td>`
      }
      mazeCode = mazeCode + `</tr>`
    }
    mazeCode += `</table>`

    return mazeCode;
  }

  generateRandomGraph(size: number) {
    const nSquare = size * size;

    let graph = new Array(nSquare);
    for (let i = 0; i < graph.length; i++) {
      graph[i] = [];
    }

    const nodeIndices = this.getNodeIndices(size);

    for (let i = 0; i < nodeIndices.midNodes.length; i++) {
      graph[nodeIndices.midNodes[i]].push(nodeIndices.midNodes[i] - 1)
      graph[nodeIndices.midNodes[i]].push(nodeIndices.midNodes[i] + size)
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
}
