import React, { useEffect, useState } from "react";
// import { Col, Row, Container } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopBar from "../components/TopBar";
import { useParams } from "react-router";
import { getApi } from "../api/commonApi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProducts] = useState([]);

  useEffect(() => {
    loadProductResource();
  }, []);

  const loadProductResource = async () => {
    const res = await getApi(`/api/product/show-single-product?id=${id}`);
    if (res.data) {
      setProducts(res.data);
    }
  };

  return (
    <>
      <TopBar />
      {Object.keys(product).length > 0 && (
        <div className="product-view">
          <Container>
            <Row>
              <Col className="col-border" xs={4}>
                {product.image_url ? (
                  <div className="product-img-container">
                    <img
                      className="product-img"
                      src={process.env.REACT_APP_BASE_URL + product.image_url}
                    />
                  </div>
                ) : (
                  <img
                    className="product-img"
                    src={process.env.REACT_APP_BASE_URL + "/bu-img.png"}
                  />
                )}
              </Col>
              <Col className="col-border" xs={8}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <b>
                    Category: <i>{product.category.name}</i>
                  </b>
                </p>
                <p>
                  <b>
                    Price: <i>{product.price}</i> &#2547; (BDT)
                  </b>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
