import { useParams } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import CompanyFormEditor from "../components/admin/CompanyFormEditor";

export default function AdminCompanyEdit() {
  const { id } = useParams();

  return (
    <AdminLayout title="Editar empresa">
      <CompanyFormEditor mode="edit" businessId={id} />
    </AdminLayout>
  );
}
