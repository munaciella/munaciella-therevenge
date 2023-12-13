import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { Box, Fab } from '@mui/material'
import { useState } from 'react'
import { voteArticle } from '../../API/api'

const Vote = ({ article_id, votes }) => {
  const [currVotes, setCurrVotes] = useState(votes)
  const [timesClicked, setTimesClicked] = useState(0)
  const [buttonColor, setButtonColor] = useState('default')


  const upVote = () => {
    if (timesClicked <= 0) {

      setTimesClicked(timesClicked + 1)
      setCurrVotes(currVotes + 1)
      voteArticle(article_id, 1).then((data) => {
        if (data.error) {
          setButtonColor('error')
        }
      })
    }

  }
  const downVote = () => {
    if (timesClicked >= 0) {
      setTimesClicked(timesClicked - 1)
      setCurrVotes(currVotes - 1)
      voteArticle(article_id, -1).then((data) => {
        if (data.error) {
          setButtonColor('error')
        }
      })


    }

  }
  
  return (
    <>
      <Box className="thumbs-up">
        <p style={{ display: 'inline', marginRight: '10px' }}>Votes: {currVotes}</p>
        <Fab size="small" onClick={upVote} color={buttonColor}>
          <ThumbUpIcon />
        </Fab>

      </Box>
      <Box className="thumbs-down">
        <Fab size="small" onClick={downVote} color={buttonColor}>
          <ThumbDownIcon />
        </Fab>
      </Box>
      {buttonColor === 'error' && <p style={{ color: 'red' }}>Error on voting please try again</p>}
    </>
  )
}

export default Vote