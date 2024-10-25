import React from 'react'
import ReactLoading from 'react-loading';

export const Loader = ({ color = "white" }) => {
    return (
        <section className='absolute bottom-[9px] left-[5rem]'>
            <ReactLoading type={'spin'} color={color} height={23} width={23} />
        </section>
    )
}


