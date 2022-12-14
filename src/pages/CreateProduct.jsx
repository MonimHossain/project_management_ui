import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Switch,
  Upload,
  Modal,
} from "antd";
import { Col, Row } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../css/Common.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopBar from "../components/TopBar";
import { getApi, postApi, postApiWithoutContentType } from "../api/commonApi";

const { Option } = Select;
const { TextArea } = Input;

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    const response = await getApi("/api/product-category/show");
    if (response.data) {
      setCategories(response.data);
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

  const formAppendingData = (values) => {
    const data = new FormData();
    data.append('name', values.name);
    data.append('sku', values.sku);
    data.append('price', values.price);
    data.append('description', values.description);
    data.append('status', values.status);
    data.append('category_id', values.category_id);
    data.append('user_id', values.user_id);
    data.append('image_url', values.image_url);
    return data;
  }

  const onFinish = async (values) => {

    const email = JSON.parse(localStorage.getItem("email"));
    const user = await getApi(`/api/user/get-user?email=${email}`);

    values.user_id = user.data.id; //assgin user id

    if (values.status === undefined) {
      values.status = "active";
    }

    if(description){
      values.description = description;
    }


    if(file){
      values.image_url = file;
    }

    const data = formAppendingData(values)
    

    // console.log(data)
    // return false;
    const response = await postApiWithoutContentType("/api/product/create", data);
    if (response.error) {
      for (let key in response.error) {
        alert(response.error[key]);
      }
    } else {
      alert(response.message);
      window.location.href = "/";
    }
  };

  function handleFileChange(e) {
      setFile(e.file.originFileObj)
  }

  return (
    <>
      <TopBar />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="card">
            <h2 className="header-name">Product Create </h2>
            <Divider />
            <Form
              layout="vertical"
              className="product-create mt-3"
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your product name!",
                  },
                ]}
              >
                <Input name="name" placeholder="Product Name" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category_id"
                rules={[
                  { required: true, message: "Please input your Category!" },
                ]}
              >
                <Select placeholder="Select a category">
                  {categories &&
                    categories.map((category) => (
                      <Option value={category.id}>{category.name}</Option>
                    ))}
                </Select>
              </Form.Item>
              <Button onClick={showModal}>Create New Category</Button>
              <br />

              <Form.Item label="SKU" name="sku">
                <Input name="sku" placeholder="SKU" />
              </Form.Item>

              <Form.Item label="Description">
                <TextArea
                  rows={4}
                  placeholder="Description"
                  name="description"
                  onChange={(e)=>setDescription(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your product price!",
                  },
                ]}
              >
                <Input type="number" name="price" placeholder="Product Price" />
              </Form.Item>

              <Form.Item label="Status" name="status">
                <Select defaultValue="active" value="active">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Image">
                <Upload
                  accept=".png, .jpg, .jpeg"
                  action={`${process.env.REACT_APP_BASE_URL}/api/test-upload`}
                  beforeUpload={(file) => {
                    return true;
                  }}
                  name="image_url"
                  onChange={(info) => handleFileChange(info)}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
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
