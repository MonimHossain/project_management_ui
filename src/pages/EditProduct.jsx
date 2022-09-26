import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Upload,
  Modal,
} from "antd";
import { Col, Row } from "react-bootstrap";
import "antd/dist/antd.css";
import "../css/Common.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopBar from "../components/TopBar";
import { getApi, postApi } from "../api/commonApi";
import { useParams } from "react-router";

const { Option } = Select;
const { TextArea } = Input;

export default function EditProduct() {
  const [product, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  useEffect(() => {
    loadResources();
    loadProductResource();
  }, []);

  const loadResources = async () => {
    const response = await getApi("/api/product-category/show");
    if (response.data) {
      setCategories(response.data);
    }
  };

  const loadProductResource = async () => {
    const res = await getApi(`/api/product/show-single-product?id=${id}`);
    if (res.data) {
      setProducts(res.data);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCategoryAdd = async () => {
    const data = {
      name: categoryName,
    };
    const res = await postApi("/api/product-category/create", data);
    loadResources();
    if (res.error) {
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  const deductUndefined = (values) => {
    if(values.name === undefined){
      delete values.name;
    }
    if(values.category_id === undefined){
      delete values.category_id;
    }
    if(values.sku === undefined){
      delete values.sku;
    }
    if(values.status === undefined){
      delete values.status;
    }
    if(values.price === undefined){
      delete values.price;
    }
    return values;
  }

  const onFinish = async (values) => {
    values = deductUndefined(values);

    if(description){
      values.description = description;
    }

    values.id = id;

    const response = await postApi("/api/product/update", values);
    if (response.error) {
      for (let key in response.error) {
        alert(response.error[key]);
      }
    } else {
      alert(response.message);
      window.location.href = "/";
    }
  };

  return (
    <>
      <TopBar />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="card">
            <h2 className="header-name">Product Edit </h2>
            <Divider />
            {Object.keys(product).length > 0 && (
              <>
                <Form
                  layout="vertical"
                  className="product-create mt-3"
                  onFinish={onFinish}
                >
                  <Form.Item label="Name" name="name">
                    <Input
                      defaultValue={product.name}
                      name="name"
                      placeholder="Product Name"
                    />
                  </Form.Item>

                  <Form.Item label="Category" name="category_id">
                    <Select defaultValue={product.category_id} placeholder="Select a category">
                      {categories &&
                        categories.map((category) => (
                          <Option value={category.id}>{category.name}</Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Button onClick={showModal}>Create New Category</Button>
                  <br />

                  <Form.Item label="SKU" name="sku">
                    <Input defaultValue={product.sku} name="sku" placeholder="SKU" />
                  </Form.Item>

                  <Form.Item label="Description">
                    <TextArea
                      rows={4}
                      placeholder="Description"
                      name="description"
                      defaultValue={product.description}
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item label="Price" name="price">
                    <Input
                      type="number"
                      name="price"
                      placeholder="Product Price"
                      defaultValue={product.price}
                    />
                  </Form.Item>

                  <Form.Item label="Status" name="status">
                    <Select defaultValue={product.status} value="active">
                      <Option value="active">Active</Option>
                      <Option value="inactive">Inactive</Option>
                    </Select>
                  </Form.Item>

                  {/* <Form.Item label="Image">
                <Upload
                  accept=".png, .jpg, .jpeg"
                  //   action={`${process.env.REACT_APP_BASE_URL}/api/courses/test-upload`}
                  beforeUpload={(file) => {
                    return true;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item> */}

                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form>
              </>
            )}
          </div>
        </Col>
      </Row>
      <Modal
        title="Category Create"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input onChange={(e) => setCategoryName(e.target.value)} />
        <Button onClick={handleCategoryAdd}>Add</Button>
      </Modal>
    </>
  );
}
