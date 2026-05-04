import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

const ProtectedLayout = ({ children, dark, setDark }) => {
  return (
    <ProtectedRoute>
      <Layout>
        {children}
      </Layout>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;