import React from 'react'

const Student = () => {
    return (
        <div style={{position:'relative',display:'flex'}}>
            {/* BOX 1 */}
                <div style={{
                    backgroundColor: 'red',
                    width: '600px',
                    height: '600px',
                }}>
                </div>
            {/* BOX 2 */}
                <div style={{
                    // display:'none',
                    backgroundColor: 'blue',
                    width: '300px',
                    height: '300px',
                    zIndex:'1',
                    position:'absolute',
                    top:'25%',
                    left:'25%'
                }}>
                </div>
            
            {/* end */}
        </div>
    )
}

export default Student