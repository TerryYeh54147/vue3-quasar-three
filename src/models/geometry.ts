
type IntRange<N extends number, Res extends Array<unknown> = []> = Res['length'] extends N ? Res : IntRange<N, [...Res, Res['length']]>;
type octalMaximum = 256;

export interface RGB {
  r: IntRange<octalMaximum>[number];
  g: IntRange<octalMaximum>[number];
  b: IntRange<octalMaximum>[number];
}

export interface GeometryProp {
  title: string,
  color?: RGB,
  showPane?: boolean,
}

export interface BoxGeometry extends GeometryProp {
  type: string,
  args: Array<number>,
  pos: Array<number>,
}

export interface TransformState {
  target: string,
  mode: string,
  color: RGB,
}
