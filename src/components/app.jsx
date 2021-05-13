import React from "react";

function App(props) {
    return (
        <>
            <div style={{minHeight: '100vh', backgroundColor: '#0091ea'}}>
                {
                    props.children
                }
            </div>
        </>
    );
}

export default App;