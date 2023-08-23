import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from './../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    return (
        <div>
            Filter
            <input value={filter} type="text" name="filter" onChange={(event) => dispatch(filterChange(event.target.value))} />
        </div>
    )
}

export default Filter