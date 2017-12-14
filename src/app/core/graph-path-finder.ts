import { Node} from "./node";

export interface GraphPathFinder<Node> {
    findShortestPath( start: number, end: number ): Node[];
}