import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "../css/Common.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Button, Pagination, Popconfirm } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { getApi, deleteApi } from "../api/commonApi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    loadResources();
  }, [flag]);

  const loadResources = async (page = null) => {
    page = page ? page : 1;
    const response = await getApi(`/api/product/show?page=${page}`);
    console.log("res data", response.data.data);
    if (response.data.data) {
      setProducts(response.data.data);
      setPagination(response.data);
    }
  };

  function cancel(e) {
    console.log(e);
  }

  const deleteProduct = async (id) => {
    const res = await deleteApi(`/api/product/delete/${id}`);
    console.log('del',res);
    if(res.error){
      alert(res.message);
    }else{
      // alert(res.message);
      flag ? setFlag(false) : setFlag(true);
    }
  };

  return (
    <>
      <TopBar />
      <h2 className="header-name">Product Management System</h2>
      <Button className="right mx-1">
        <Link className="clean" to="/create-product">Create New</Link>
      </Button>
      <div className="product-table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>SKU</th>
              <th>Username</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.user.username}</td>
                  <td>{product.price}</td>
                  <td>{product.status}</td>
                  <td className="text-center">
                    {/* <Link to={`/table-matrix/${faq.id}`}> */}
                    <Link to={`/product-view/${product.id}`}>
                      <Button className="mx-1" data-toggle="tooltip" title="Product View" icon={<EyeOutlined />}></Button>
                    </Link>
                    <Link to={`/edit-product/${product.id}`}>
                      <Button className="mx-1" data-toggle="tooltip" title="Product Edit" icon={<EditOutlined />}></Button>
                    </Link>
                    <Popconfirm
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      title="Are you sure?"
                      onConfirm={() => deleteProduct(product.id)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="Cancel"
                    >
                      <Button
                        className="mx-1"
                        data-toggle="tooltip" title="Product Delete"
                        danger
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {pagination && (
          <Pagination
            defaultCurrent={1}
            total={pagination.total}
            showTotal={(total) => `Total ${total} items`}
            onChange={(p) => {
              loadResources(p);
            }}
          />
        )}
      </div>
    </>
  );
}
