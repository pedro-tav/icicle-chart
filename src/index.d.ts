export interface ConfigOptions {}

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type NodeAccessor<T> = Accessor<Node, T>;

export interface Node {
  __dataNode?: DataNode;
  name?: string;
  children?: Node[];
}

export interface DataNode {
  data: Node;
  id: number;
  value: number;
  depth: number;
  height: number;
  parent: DataNode | null;
  children?: DataNode[];
  x0?: number;
  y0?: number;
  x1?: number;
  y1?: number;
}

type CompareFn<ItemType> = (a: ItemType, b: ItemType) => number;

type TooltipFn = (node: Node, dataNode: DataNode) => string;

export type Orientation = 'td' | 'bu' | 'lr' | 'rl';

export interface IcicleChartGenericInstance<ChainableInstance> {
  (element: HTMLElement): ChainableInstance;

  width(): number;
  width(width: number): ChainableInstance;
  height(): number;
  height(height: number): ChainableInstance;

  orientation(): Orientation;
  orientation(orientation: Orientation): ChainableInstance;

  data(): Node;
  data(rootNode: Node): ChainableInstance;
  children(): NodeAccessor<Node[]>;
  children(childrenAccessor: NodeAccessor<Node[]>): ChainableInstance;
  label(): NodeAccessor<string>;
  label(textAccessor: NodeAccessor<string>): ChainableInstance;
  size(): NodeAccessor<string>;
  size(sizeAccessor: NodeAccessor<string>): ChainableInstance;
  color(): NodeAccessor<string>;
  color(colorAccessor: NodeAccessor<string>): ChainableInstance;
  nodeClassName(): NodeAccessor<string>;
  nodeClassName(nodeClassName: NodeAccessor<string>): NodeAccessor<string>;

  minSegmentWidth(): number;
  minSegmentWidth(width: number): ChainableInstance;
  excludeRoot(): boolean;
  excludeRoot(exclude: boolean): ChainableInstance;

  sort(): CompareFn<Node> | null;
  sort(cmpFn: CompareFn<Node> | null);

  showLabels(): boolean;
  showLabels(show: boolean): ChainableInstance;
  showTooltip(): (node: Node) => boolean;
  showTooltip(showTooltipFn: (node: Node) => boolean): ChainableInstance;
  tooltipTitle(): TooltipFn;
  tooltipTitle(fn: TooltipFn): ChainableInstance;
  tooltipContent(): TooltipFn;
  tooltipContent(fn: TooltipFn): ChainableInstance;

  onClick(cb: ((node: Node) => void) | null): ChainableInstance;
  onHover(cb: ((node: Node | null) => void) | null): ChainableInstance;

  zoomToNode(node: Node): ChainableInstance;
  zoomBy(k: number):ChainableInstance;
  zoomReset():ChainableInstance;
}

export type IcicleChartInstance = IcicleChartGenericInstance<IcicleChartInstance>;

declare function IcicleChart(configOptions?: ConfigOptions): IcicleChartInstance;

export default IcicleChart;
