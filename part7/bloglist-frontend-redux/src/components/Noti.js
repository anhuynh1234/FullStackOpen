
const Noti = ({noti}) => {
    if(!noti) {
        return null;
    }
    
    return (
        <div id={noti[0]}>
            {noti[1]}
        </div>
    )
}

export default Noti