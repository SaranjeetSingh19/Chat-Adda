import React from 'react'
import {Helmet} from "react-helmet-async"

const Title = ({title="Chat Adda", description="Online Chat Application"}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
    </Helmet>
  )
}

export default Title