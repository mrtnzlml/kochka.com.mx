// @flow strict

import * as React from 'react';

import HeadingLevel from './HeadingLevel';

type Props = {|
  +children: React.Node,
|};

export default function Section(props: Props): React.Node {
  return (
    <HeadingLevel.Consumer>
      {(level) => (
        <HeadingLevel.Provider value={level + 1}>
          {/* eslint-disable-next-line react/forbid-elements */}
          <section>{props.children}</section>
        </HeadingLevel.Provider>
      )}
    </HeadingLevel.Consumer>
  );
}
