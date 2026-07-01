export interface StaticNode {
  segment: string;
  [key: string]: StaticNode | ((param: string) => StaticNode) | string;
}

export interface PathSegment {
  segment: string;
  segments: string[];
  url: string;
  [key: string]: PathSegment | ((param: string) => PathSegment) | string | string[];
}

export const makeNode = (segment: string, parentSegments: string[]): PathSegment => {
  const segments = [...parentSegments, segment];
  return { segment, segments, url: segments.join('/') };
};

export function buildNode(node: StaticNode, parentSegments: string[] = []): PathSegment {
  const result = makeNode(node.segment, parentSegments);

  for (const key of Object.keys(node)) {
    if (key === 'segment') continue;

    const child = node[key];

    if (typeof child === 'function') {
      // call with placeholder to discover the full shape of the returned node
      const shape = child('') as StaticNode;

      result[key] = (param: string) => {
        const paramShape = child(param) as StaticNode;
        // override segment with actual param but keep discovered shape
        return buildNode({ ...paramShape, segment: param }, result.segments);
      };
    } else if (typeof child === 'object') {
      // static node — recurse
      result[key] = buildNode(child as StaticNode, result.segments);
    }
  }

  return result;
}
