import { Navigate } from 'react-router-dom';

interface Props {
  pageName: string;
  children: JSX.Element;
}

const allowedPages = new Set(['dashboard', 'data-grid', 'form', 'kanban', 'gallery']);

export const ProtectedRoute = ({ children, pageName }: Props) => {
  if (!allowedPages.has(pageName)) {
    return <Navigate to="/" replace />;
  }
  return children;
};
