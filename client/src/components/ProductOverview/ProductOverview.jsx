import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getProductById } from "../../api/products";
import { useParams, useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Reviews from "./Reviews";
import "./productOverview.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductOverview() {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    async function getProduct() {
      if (!id) return;
      const response = await getProductById(id);
      setProduct(response);
    }
    getProduct();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-overview-container">
      <IconButton
        sx={{
          position: "absolute",

          backgroundColor: "#ff0000",
          color: "#fff",
          borderRadius: "50%",
          padding: "5px",
          fontSize: "20px",
        }}
        onClick={handleGoBack}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia
              sx={{ height: 400 }}
              image={`/ProductOverview/${product.name}.jpg`}
              title="product"
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
              <Reviews id={id} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
