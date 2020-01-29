import React, { Component } from 'react'
import { CeoData as data } from './constants/ProcessData';

const RenderNode = (node) => {
  return (
    <div>
      <h1>Parent:</h1>
      <h2>{node._id}</h2>
      <h3>Child:</h3>
        {
          node.childs.map(n=>
            {return(
              <div key={n._id} className="node">
                {n._id}
                <p>{n.name}</p>
              </div>
            )}
          )
        }
    </div>
    )
}

const RenderOne = (p, c) => 
              <div>
                <div className="node">{p}</div>
                <div className="node">{c}</div>
              </div>;

const RenderAll = () => {
  let parentArray = data.map(d=>d.childs);
  let childArray = data.map(d=>d.childs.map(d=>d.childs));
  let result = RenderOne(parentArray, childArray)

  while(childArray.length !== 0){
    parentArray = childArray.map(d=>d.childs);
    childArray = parentArray.map(d=>d.childs.map(d=>d.childs));
    result = result + RenderOne(parentArray, childArray)
  }

  //console(temp)
  return(
    <div>{result}</div>
  )
}

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
        {/* {RenderAll()} */}
        {createTree(data)}
        {/* {RenderNode(data.map(d=>d))} */}
      </div>
    )
  }
}

export default Main
