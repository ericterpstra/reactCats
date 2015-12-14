// Stateless Function Component
// https://facebook.github.io/react/docs/reusable-components.html

import React from 'react';


let CatThumbnail = (props) => (
    <div className="thumbContainer">
        <img
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            alt={`Picture of ${props.cat.name}`}
            src={props.cat.thumbnail} />
    </div>
);

export default CatThumbnail;