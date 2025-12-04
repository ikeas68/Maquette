import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  Avatar,
  Button
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BoltIcon from '@mui/icons-material/Bolt';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { activity, chartData, kpi } from '../data/activity';
import { useSnackbar } from '../components/notifications/SnackbarProvider';

export const Dashboard = () => {
  const { notify } = useSnackbar();

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
        {kpi.map((item) => (
          <Card key={item.label} sx={{ flex: 1, background: 'linear-gradient(135deg, rgba(94,240,255,0.2), transparent)' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                  <ShowChartIcon />
                </Avatar>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h5">{item.value}</Typography>
                  <Chip label={item.delta} color="success" size="small" sx={{ mt: 1 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
                    <TimelineIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">Pipeline hebdomadaire</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Leads vs closes
                    </Typography>
                  </Box>
                </Stack>
                <Button variant="outlined" onClick={() => notify('Graphique exporté !', 'success')}>
                  Exporter
                </Button>
              </Stack>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5ef0ff" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5ef0ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorWin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="leads" stroke="#5ef0ff" fillOpacity={1} fill="url(#colorLeads)" />
                    <Area type="monotone" dataKey="win" stroke="#a855f7" fillOpacity={1} fill="url(#colorWin)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', color: 'success.contrastText' }}>
                  <BoltIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">Dernières actions</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Temps réel simulé
                  </Typography>
                </Box>
              </Stack>
              <Stack spacing={2}>
                {activity.map((item) => (
                  <Stack key={item.id} spacing={0.5}>
                    <Typography variant="body1" fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.actor} · {item.time}
                    </Typography>
                    <LinearProgress variant="determinate" value={80 - item.id * 5} sx={{ borderRadius: 3 }} />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};
