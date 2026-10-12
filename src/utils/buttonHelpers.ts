import { Children, isValidElement } from 'react';
import type React from 'react';

type IconShapeProps = { borderRadius?: number; round?: boolean };

export const isPromise = (obj: unknown): obj is Promise<unknown> =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  'then' in obj &&
  typeof (obj as Promise<unknown>).then === 'function';

export function getButtonBorderRadius(children: React.ReactNode) {
  const childNodes = Children.toArray(children);

  if (childNodes.length !== 1) {
    return undefined;
  }

  const [child] = childNodes;

  if (!isValidElement<IconShapeProps>(child)) {
    return undefined;
  }

  if (child.props.round) {
    return '50%';
  }

  return child.props.borderRadius ?? 0;
}

export function hasTextContent(children: React.ReactNode): boolean {
  return Children.toArray(children).some(child => {
    if (typeof child === 'string') {
      return child.trim().length > 0;
    }

    if (typeof child === 'number') {
      return true;
    }

    if (!isValidElement<{ children?: React.ReactNode }>(child)) {
      return false;
    }

    return hasTextContent(child.props.children);
  });
}
