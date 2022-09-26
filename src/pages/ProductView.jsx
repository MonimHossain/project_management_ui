import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TopBar from "../components/TopBar";
import { useParams } from "react-router";
import { getApi } from "../api/commonApi";

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
          <Row>
            <Col className="col-border" xs={4}>
                <h1>IMAGE</h1>
            </Col>
            <Col className="col-border"  xs={8}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><b>Category: <i>{product.category.name}</i></b></p>
                <p><b>Price: <i>{product.price}</i> &#2547; (BDT)</b></p>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
