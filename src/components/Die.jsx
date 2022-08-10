const Die = (props) => {
    const style = {
        backgroundColor: (props.isHeld) ? "#59E391" : "#fff" 
    }
    return (
        <div onClick={props.hold} style={style} className="die-face">
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}
export default Die