import React from 'react';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import AutoAwesomeMotionRoundedIcon from '@mui/icons-material/AutoAwesomeMotionRounded';
import { Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const navItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <QueryStatsRoundedIcon fontSize="medium" />,
    children: [{ id: 'dashboard', label: 'Dashboard', icon: <DashboardRoundedIcon fontSize="medium" />, path: '/' }]
  },
  {
    id: 'data',
    label: 'Data & Ops',
    icon: <StorageRoundedIcon fontSize="medium" />,
    children: [
      { id: 'grid', label: 'Data Grid', icon: <WidgetsRoundedIcon fontSize="medium" />, path: '/data-grid' },
      { id: 'kanban', label: 'Kanban Board', icon: <ViewKanbanRoundedIcon fontSize="medium" />, path: '/kanban' }
    ]
  },
  {
    id: 'experiments',
    label: 'Experience',
    icon: <DesignServicesRoundedIcon fontSize="medium" />,
    children: [
      { id: 'form', label: 'Form Builder', icon: <StickyNote2RoundedIcon fontSize="medium" />, path: '/form' },
      { id: 'gallery', label: 'UI Gallery', icon: <AutoAwesomeMotionRoundedIcon fontSize="medium" />, path: '/gallery' }
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

  const handleNodeSelect = (_event: React.SyntheticEvent, nodeId: string) => {
    if (nodeId.startsWith('/')) {
      navigate(nodeId);
    }
  };

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="overline" color="text.secondary" sx={{ px: 1.5, fontSize: '0.9rem', letterSpacing: 1 }}>
        Explorer
      </Typography>
      <TreeView
        aria-label="navigation"
        defaultExpandIcon={<ChevronRightIcon />}
        defaultCollapseIcon={<ExpandMoreIcon />}
        expanded={expanded}
        selected={pathname}
        onNodeSelect={handleNodeSelect}
        sx={{ flexGrow: 1, overflowY: 'auto' }}
      >
        {navItems.map((item) => (
          <TreeItem
            key={item.id}
            nodeId={item.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
                {item.icon}
                <Typography variant="subtitle1" fontWeight={700}>
                  {item.label}
                </Typography>
              </Box>
            }
          >
            {item.children?.map((child) => (
              <TreeItem
                key={child.id}
                nodeId={child.path}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    {child.icon}
                    <Typography variant="subtitle2" fontWeight={600}>
                      {child.label}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Box>
  );
};
