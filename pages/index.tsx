import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { AStarFinder } from "../public/components/a-star";
import { IPoint } from '../public/components/core/astar-finder';
import { useState } from 'react';

import RealTimeGrid from '../public/components/rtg'

export default function Home() {
  const [height, setHeight] = useState(10);
  const [start, setStart] = useState({x: 0, y: 0});
  const [end, setEnd] = useState({x: 5, y: 2});
  const [path, setPath] = useState(false);

  const [astar, setAstar] = useState(AStar(start, end, height));

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>A* Algorithm</h1>

      <div className={styles.bodyFit}>
        <div className={styles.inputFields}>
          <h3>Size</h3>
          <input type="number" onChange={(e) => { setHeight(parseInt(e.target.value)); setAstar(AStar(start, end, height)) }} value={height}/>
        
          <button onClick={() => { setAstar(AStar(start, end, height)); setPath(true); }}>Simulate</button>
        </div>
        
        <RealTimeGrid grid={astar} start={start} end={end} showPath={path}/>
      </div>
      

      
    </div>
  )
}

function AStar(start: IPoint, end: IPoint, size: number) {
  let astar = new AStarFinder({
    grid: {
      width: size,
      height: size,
      densityOfObstacles: 1
    },
    diagonalAllowed: false
  });

  return astar;
}
