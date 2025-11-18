import React from 'react';

const APODimage = ({title, url}) => (
// const APODimage = () => (
    <div>
        <h2>{title}</h2>
        {/*<img src="url placeholder" alt="title placeholder" style={{{maxWidth: '100%'}} />*/}
        <img src={url} alt={title} style={{maxWidth: '100%'}} />
    </div>
);

export default APODimage;