import React from 'react'
import { AStarFinder, IPoint } from './core/astar-finder';
import styles from '../../styles/Home.module.css'

class RealTimeGrid extends React.Component<{grid: AStarFinder, start: IPoint, end: IPoint, showPath: boolean}, {path: number[][] | null}> {
    constructor(props) {
        super(props);

        this.state = { path: undefined };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    render() {
        const path = this.props.grid.findPath(this.props.start, this.props.end);

        return (
            <tbody className={styles.grid} key={"AHAHA"}>
                {
                    this.props.grid.getGrid().getGridNodes().map((e, index) => {
                        return (
                            <tr className={styles.gridRow}>
                                {   
                                    e.map((e2, index2) => {                                    
                                        return (
                                            (JSON.stringify(e2.position) == JSON.stringify(this.props.start) || JSON.stringify(e2.position) == JSON.stringify(this.props.end)) ? 
                                                <td className={styles.startNode} id={`${index} ${index2}`}>
                                                </td>
                                            :
                                                (path)
                                                ?
                                                <td className={
                                                    (this.props.grid.getGrid().getGridNodes()[index][index2].getIsWalkable()) 
                                                    ? 
                                                    (
                                                        (path.find(elemental => {
                                                            //console.log(elemental, [index, index2], (elemental == [index, index2]) ? "Y" : "");
                                                    
                                                            return JSON.stringify(elemental) === JSON.stringify([index2, index])
                                                        })) 
                                                        ? 
                                                            styles.coloured 
                                                        : 
                                                            styles.gridWalkable
                                                    )
                                                    :
                                                    styles.gridElement
                                                } id={`${index} ${index2}`}>

                                                </td>
                                                :
                                                <td className={styles.gridWalkable} id={`${index} ${index2}`}></td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }
}

export default RealTimeGrid;