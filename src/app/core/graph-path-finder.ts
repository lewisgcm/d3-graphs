import { Node } from "./node";
import { Path} from "./path";

export interface GraphPathFinder<Node> {
    findShortestPath( start: number, end: number ): Path;
}