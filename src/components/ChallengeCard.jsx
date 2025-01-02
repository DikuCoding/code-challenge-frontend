import React from 'react'

const ChallengeCard = ({challenge}) => {
  return (
    <div className='flex flex-col'>
      {challenge.type}
    </div>
  )
}

export default ChallengeCard
