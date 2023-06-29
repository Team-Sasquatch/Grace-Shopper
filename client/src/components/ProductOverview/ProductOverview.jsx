import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getProductById } from '../../api/products';
import { useParams } from 'react-router-dom';
import { createContext, useState, useEffect } from "react";


export default function ProductOverview() {
    const [product, setProduct] = useState({});

    let { id } = useParams();
    useEffect(() => {
        async function getProduct() {
            if (!id)
                return;
            const response = await getProductById(id);
            setProduct(response);
        }
        getProduct();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid xs={12} md={12}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 400 }}
                        image="/ProductOverview/soccerball.jpg"
                        title="Soccer Ball"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Reviews</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}