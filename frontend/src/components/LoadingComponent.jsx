import React from 'react';
import {Spinner} from "react-bootstrap";

const LoadingComponent = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Spinner size={20} color="#000"/>
        </div>
    );
};

export default LoadingComponent;