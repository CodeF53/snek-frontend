function Help() {
    return (
        <div className="panel">
            Use <kbd>W</kbd>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd> or the arrow keys (
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <kbd>→</kbd>
            <kbd>←</kbd>) to change the direction your snek moves.
            <br/><br/>
            Eat apples to get longer
            {/* add gif of eating apple */}
            <br/><br/>
            Avoid hitting yourself to not die
            {/* add gif of hitting self and dying */}
            <br/><br/>
            The walls wrap you to the other side of the arena
            {/* add gif of hitting self and dying */}
        </div>
    )
}
export default Help