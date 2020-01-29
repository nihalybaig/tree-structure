import React, { Component } from 'react'
import { CeoData as data } from './constants/ProcessData';

const createTree = (data, lev) => {
  let level = lev || 0;
  let children = [];
  data.map(d => {
      if (d.childs && d.childs.length) { // has child?
          level++;
          children.push(
              <div key={d._id} className={"level-" + (level)}>
                  <div className="node">{d.name}</div>
                  {createTree(d.childs, level)}
              </div>
          );
      } else {
          children.push(
              <div  className="node last-nodes"key={d._id}>
                  {d.name}
              </div>
          );
      }
  })
  return <div className='tree-of-nodes'>{children}</div>;
}

export class Main extends Component {
  render() {
    return (
      <div>
        {createTree(data)}
      </div>
    )
  }
}

export default Main
