import React, { Component } from 'react'
import { CeoData as data } from './constants/ProcessData';

const toggleTree = (e) => {
  let el = document.getElementById(e.target.id).parentElement.childNodes[2];
  let showEl = el.style.display;
  (showEl==="none" || showEl==="")?
    el.style.display="inline-block"
    :
    el.style.display="none"
}

const createTree = (data, lev) => {
  let level = lev || 0;
  let children = [];
  data.map((d,index) => {

      level = index === data.length ? level : level+1;
      if (d.childs && d.childs.length) { // has child?
          children.push(
              <div key={d._id} className={"level level-" + (level)}>
                <div className="level-label">{"Level"+(level--)}</div>
                <div className="node" id={d._id} onClick={(e)=>toggleTree(e)}>{d.name}</div>
                {createTree(d.childs, level+1)}
              </div>
          );
      } else {
          children.push(
            <div key={d._id} className={"level level-" + (level)}>
              <div className="level-label">{"Level"+(level--)}</div>
              <div className="node last-nodes"key={d._id}>
                  {d.name}
              </div>
            </div>
              
          );
      }
      return null;
  })
  return <div className='tree-of-nodes'>{children}</div>;
}

export class Main extends Component {
  componentDidMount(){
    // quick hack
    document.getElementsByClassName('App-header')[0].children[0].childNodes[0].style.display = 'inline-block';
  }
  render() {
    return (
      <div>
        {createTree(data)}
      </div>
    )
  }
}

export default Main
