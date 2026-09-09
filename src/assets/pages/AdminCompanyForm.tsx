import AdminLayout from "../components/admin/AdminLayout";
import CompanyFormEditor from "../components/admin/CompanyFormEditor";

export default function AdminCompanyForm() {
  return (
    <AdminLayout title="Nova empresa">
      <CompanyFormEditor mode="create" />
    </AdminLayout>
  );
}
