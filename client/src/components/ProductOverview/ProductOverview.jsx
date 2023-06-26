import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ProductOverview() {
    const rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push( <Grid xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/ProductOverview/soccerball.jpg"
                    title="Soccer Ball"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Soccer Ball
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This soccer ball is so great, it can almost kick itself into the goal.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>);
    }
    return (
        <Grid container spacing={2}> 
            {rows}
        </Grid>
    )
}