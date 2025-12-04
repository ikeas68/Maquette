import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const BreadcrumbsNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link color="inherit" underline="hover" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        return isLast ? (
          <Typography color="text.primary" key={href}>
            {value}
          </Typography>
        ) : (
          <Link key={href} color="inherit" underline="hover" onClick={() => navigate(href)} sx={{ cursor: 'pointer' }}>
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
