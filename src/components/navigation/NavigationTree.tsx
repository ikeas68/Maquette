import { TreeItem, TreeView } from '@mui/x-tree-view';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CategoryIcon from '@mui/icons-material/Category';
import InsightsIcon from '@mui/icons-material/Insights';
import FormIcon from '@mui/icons-material/Description';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const navItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <InsightsIcon fontSize="small" />,
    children: [{ id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/' }]
  },
  {
    id: 'data',
    label: 'Data & Ops',
    icon: <TableViewIcon fontSize="small" />,
    children: [
      { id: 'grid', label: 'Data Grid', icon: <CategoryIcon fontSize="small" />, path: '/data-grid' },
      { id: 'kanban', label: 'Kanban Board', icon: <ViewKanbanIcon fontSize="small" />, path: '/kanban' }
    ]
  },
  {
    id: 'experiments',
    label: 'Experience',
    icon: <DesignServicesIcon fontSize="small" />,
    children: [
      { id: 'form', label: 'Form Builder', icon: <FormIcon fontSize="small" />, path: '/form' },
      { id: 'gallery', label: 'UI Gallery', icon: <AutoAwesomeMosaicIcon fontSize="small" />, path: '/gallery' }
    ]
  }
];

const findExpanded = (pathname: string) =>
  navItems
    .filter((item) => item.children?.some((child) => child.path === pathname))
    .map((item) => item.id);

export const NavigationTree = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const expanded = findExpanded(pathname);

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="overline" color="text.secondary" sx={{ px: 1.5 }}>
        Explorer
      </Typography>
      <TreeView
        aria-label="navigation"
        defaultExpandIcon={<ChevronRightIcon />}
        defaultCollapseIcon={<ExpandMoreIcon />}
        expanded={expanded}
        selected={pathname}
        sx={{ flexGrow: 1, overflowY: 'auto' }}
      >
        {navItems.map((item) => (
          <TreeItem
            key={item.id}
            nodeId={item.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.icon}
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            }
          >
            {item.children?.map((child) => (
              <TreeItem
                key={child.id}
                nodeId={child.path}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {child.icon}
                    <Typography variant="body2">{child.label}</Typography>
                  </Box>
                }
                onClick={() => navigate(child.path)}
              />
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Box>
  );
};
