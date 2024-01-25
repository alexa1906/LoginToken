import { Button, Form, Input, Modal, Table } from "antd";
import { useGetProfile } from "../hooks/api/useGetProfile";
import { useGetCompanies } from "../hooks/api/useGetCompanies";
import { columns } from "../constants";

const Profile = () => {
  const { data } = useGetProfile();
  const { data: companies } = useGetCompanies();

  return (
    <>
      <h1>Profile</h1>

      {data && (
        <div>
          <h3>
            Name: {data.data.firstName} {data.data.lastName}
          </h3>
        </div>
      )}

      <h2>Companies</h2>

      <Table
        columns={columns}
        dataSource={companies}
        pagination={{pageSize: 1, total: companies.length}}
      />
    </>
  );
};

export default Profile;
