import React from 'react';
import { Group, Line, Rect, Text } from 'react-konva';

import { Config } from '../Config';
import ListVisualizer from '../ListVisualizer';
import { isEmptyList, isList, toText } from '../ListVisualizerUtils';
import { DataTreeNode } from '../tree/DataTreeNode';
import { NullDrawable } from './NullDrawable';

/**
 *  Represents an array in a tree. It takes up to two data items.
 */
export class ArrayDrawable extends React.Component {
  private elements: DataTreeNode[] | null;
  private length: number = 2;

  constructor(props: { elements: DataTreeNode[] }) {
    super(props);
    this.elements = props.elements;
    this.length = props.elements.length;
  }

  render() {
    const createChildText = (node: DataTreeNode | null, shift: number) => {
      if (node == null) {
        return null;
      }
      const nodeValue = node.data;
      if (!isList(nodeValue)) {
        const textValue: string | undefined = toText(nodeValue);
        const textToDisplay = textValue ?? '*' + ListVisualizer.displaySpecialContent(node);
        return (
          <Text
            text={textToDisplay}
            align={'center'}
            width={Config.VertBarPos * Config.BoxWidth}
            x={Config.VertBarPos * Config.BoxWidth * shift}
            y={Math.floor((Config.BoxHeight - 1.2 * 12) / 2)}
            fontStyle={textValue === undefined ? 'italic' : 'normal'}
            fill={'white'}
          />
        );
      } else if (isEmptyList(nodeValue)) {
        const props = {
          // fix this pls
          // x: isLeftNode ? -Config.BoxWidth * Config.VertBarPos : 0,
          x: 0,
          y: 0
        };
        return <NullDrawable {...props} />;
      } else {
        // Allow for tree drawing here
        // ListVisualizer.createDrawing([]);
        // return ArrayDrawable;
        return null;
      }
    };

    const bars = () => {
      const all = [];
      for (let i = 0; i < this.length; i++) {
        const shift = Config.BoxWidth * Config.VertBarPos;
        const xvalue = Config.BoxWidth + shift * (i - 1);
        all.push(
          <Line
            points={[xvalue, 0, xvalue, Config.BoxHeight]}
            strokeWidth={Config.StrokeWidth}
            stroke={Config.Stroke}
          />
        );
        all.push(createChildText(this.elements ? this.elements[i] : null, i));
        // console.log(createChildText(this.elements ? this.elements[i] : null, i));
        // all.push(this.drawables ? this.drawables[i] : null);
      }
      return all;
    };

    return (
      <Group>
        {/* Outer rectangle */}
        <Rect
          width={(Config.BoxWidth * this.length) / 2}
          height={Config.BoxHeight}
          strokeWidth={Config.StrokeWidth}
          stroke={Config.Stroke}
          fill={'#17181A'}
        />
        {/* The vertical lines and all the elements */}
        {bars()}
      </Group>
    );
  }
}
