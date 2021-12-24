import React from 'react'

const SearchBox = (props) => {
    return (
        <div className='col col-sm-4'>
            <input 
            className='form-control'
            placeholder='Type to search'
            value={props.value}
            onChange={(ev) => props.setSearchValue(ev.target.value)}
            />
        </div>
    )
}

export default SearchBox
