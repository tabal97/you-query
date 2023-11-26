import { ExpandMore, ExpandMoreOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios'

interface ISummaryDataProp  {
    youtubeUrl: string
}
const mockResponse = {
    status: 200,
    data: {
        summary: `Key points from the video \n
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolorem, inventore ipsam recusandae deserunt sunt a labore placeat cum consectetur, praesentium nam sit qui aut vitae ab at? Ratione, facilis!`
    } 
}
export function VideoSummaryPage(){

    const [videoLink, setVideoLink] = useState('')
    const [summaryExpanded, setSummaryExpanded] = useState(true)
    const [videoSummaryText, setVideoSummaryText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})
    // const validateForm
    useEffect(() => {
        console.log(videoSummaryText, '< videoSummaryText')
    }, [videoSummaryText])
    
    const postSummary = async (summaryData: ISummaryDataProp) =>{
        try {
            //---uncomment later
            // const response = await axios.post(`http://localhost:3003/summarize`, summaryData)
            if (mockResponse.status === 200){
                const summary = mockResponse.data.summary
                setVideoSummaryText(summary)
                console.log(videoSummaryText, '< videoSummaryText')
            }
            // console.log(response.data) /
        }catch(error){
            console.error(`Error posting data: ${Error}`)
        }
    }
    const handleSummarize = () => {
let data = {
    youtubeUrl: "videoLink"
}
        //validateForm
        setIsLoading(true)
        postSummary(data)
        setTimeout(()=>{
            
            setIsLoading(false)
        
        }, 4000)
    }
    const handleAccordionChange=()=>{
        setSummaryExpanded(!summaryExpanded)
    }
    return(
        <Container maxWidth="md" sx={{backgroundColor: 'primary.dark'}} >
            <Typography textAlign="center" sx={{color: 'text.primary', fontWeight: '700'}} variant="h1">YouQuery Video Summarizer</Typography>
            <Box marginY={2}>
            <TextField
          error={false}
          onChange={(e)=>{
            setVideoLink(e.target.value)
          }}
          fullWidth
          id="outlined-error-helper-text"
          label="Insert your video link here"
          defaultValue="example.com/my-video"
          helperText="Some helper text"
        />
            </Box>
            <Box marginY={2} >
            <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={2}
          defaultValue="Further details on how you would like this summarised"
          fullWidth
        />
            </Box>
            
            <Container maxWidth="sm">
                <Box textAlign="center" >

                <Button disabled={isLoading} onClick={handleSummarize} color="success" variant="contained">Summarize</Button>
                </Box>
            </Container>

            {isLoading ? <Grid justifyContent="center" container marginY={2}><CircularProgress/></Grid> : <Box marginY={2}>
        
        <Accordion   expanded={summaryExpanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMore style={{color: '#FFFFFF'}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"

        >
          <Typography variant="h5">Here is your video summary:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {!videoSummaryText && isLoading ? "Loading summary..." : videoSummaryText}
          </Typography>
        </AccordionDetails>
      </Accordion>
            </Box>}
        </Container>
    )
}