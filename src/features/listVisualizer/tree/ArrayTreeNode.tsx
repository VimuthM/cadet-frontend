import { Group } from 'react-konva';

import { ArrayDrawable, ArrowDrawable } from '../drawable/Drawable';
// import { DataTreeNode } from './DataTreeNode';
import { DrawableTreeNode } from './DrawableTreeNode';

/**
 * Represents a node corresponding to a Source array.
 */
export class ArrayTreeNode extends DrawableTreeNode {
  public length: number = 0;

  createDrawable(x: number, y: number, parentX: number, parentY: number): JSX.Element {
    //   const leftNode = this.elements instanceof DataTreeNode ? this.left : null;
    const elements = this.elements;
    this.length = this.elements ? this.elements.length : 0;
    const arrayProps = { elements: elements };
    const arrayDrawable = <ArrayDrawable {...arrayProps}></ArrayDrawable>;

    this._drawable = (
      <Group x={x} y={y}>
        {arrayDrawable}
        {parentX !== x && (
          <ArrowDrawable
            {...{
              from: {
                x: parentX,
                y: parentY
              },
              to: {
                x,
                y
              }
            }}
          ></ArrowDrawable>
        )}
      </Group>
    );
    this.drawableX = x;
    this.drawableY = y;
    return this._drawable;
  }
}
