import { Button, Dropdown, Menu, MenuProps, Modal, Space } from "antd";
import { useRef, useState } from "react";
import { SendOutlined, DownOutlined } from "@ant-design/icons";
import { useGetCertificateType } from "../hooks/api/useGetCertificateType";

const Settings = () => {
  const { data } = useGetCertificateType();
  const [image, setImage] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: any) => {
    const { files } = e.target;
    if (files && files.length) {
      const selectedFile = files[0];

      setImage(selectedFile);
      setModalVisible(true);
    }
  };

  const onButtonClick = () => {
    inputFile.current?.click();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const menu = (
    <Menu>
      {data.map((type: any) => (
        <Menu.Item key={type.name} onClick={() => handleCertificateClick(type)}>
          {type.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleCertificateClick = (certificate: any) => {
    // Handle the selected certificate
    console.log("Selected certificate:", certificate);
  };

  return (
    <div>
      <h1>Settings</h1>
      <input
        style={{ display: "none" }}
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />

      <Button style={{ marginRight: 100 }} onClick={onButtonClick}>
        Add
      </Button>

      <Modal
        title="Selected File"
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <Space key="space" align="end">
            <Button
              key="send"
              type="primary"
              icon={<SendOutlined />}
              onClick={closeModal}
            >
              Send
            </Button>
          </Space>,
        ]}
      >
        {image && (
          <div>
            <p>File Name: {image.name}</p>
            {image.type === "application/pdf" ? (
              <iframe
                title="PDF Viewer"
                src={URL.createObjectURL(image)}
                style={{ width: "100%", height: "500px", border: "none" }}
              />
            ) : (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
        )}
      </Modal>

      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Types Certificates
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Settings;
