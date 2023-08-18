import { IconButton, Typography,Box, Card, Stack, Grid, Button } from "@mui/material";

//usual item display and handling
function Item(props){
    const name=props.name;
    const size=props.size;
    const path=props.path;

    return <Grid item xs={8}>
    <Card sx={{marginLeft:"10%",boxShadow:3,marginBottom:"5rem",padding:"2rem"}}>

        <Stack direction={"row"}>
        <Button onClick={()=>props.clicked(path)}>
        <Typography variant="h4" color="#42a5f5" sx={{wordWrap:"break-word",marginRight:"2rem",cursor:"default",width:"100%"}}>
          {name}
        </Typography>
        </Button>

        <Typography variant="h4" sx={{marginRight:0,marginLeft:"auto"}}>
            {size}{" bytes"}
        </Typography>
        </Stack>
    </Card>
    </Grid>
}

export default Item;