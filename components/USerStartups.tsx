import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, {StartupTypecard} from './StartupCard'

const USerStartups = async({id}:{id:string}) => {

    const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, {id})

  return (
    <>
    {startups.length >0 ? startups.map((startup:StartupTypecard)=>(
        <StartupCard key={startup._id} product={startup} />
    )): <p className="no-result">No Posts Yet</p>}
    </>
  )
}

export default USerStartups