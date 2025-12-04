import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  Slider,
  FormControlLabel,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSnackbar } from '../components/notifications/SnackbarProvider';

const schema = z.object({
  fullName: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  budget: z.number().min(1000, 'Budget min. 1000'),
  priority: z.number().min(1).max(10),
  active: z.boolean().default(true),
  segment: z.string().min(1),
  tags: z.array(z.string()).min(1, 'Au moins un tag'),
  meeting: z.date().optional()
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  fullName: 'Ada Lovelace',
  email: 'ada.lovelace@example.com',
  budget: 12000,
  priority: 7,
  active: true,
  segment: 'Enterprise',
  tags: ['Innovation', 'VIP'],
  meeting: new Date()
};

const segments = ['Startup', 'Scale-up', 'Enterprise'];
const tagOptions = ['Innovation', 'VIP', 'Onboarding', 'Upsell', 'Support'];

export const FormPage = () => {
  const { handleSubmit, control, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues
  });
  const { errors, isSubmitting } = formState;
  const { notify } = useSnackbar();

  const onSubmit = (values: FormValues) => {
    notify(`Données sauvegardées pour ${values.fullName}`, 'success');
  };

  const onError = () => notify('Formulaire incomplet', 'error');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h5">Formulaire contrôlé</Typography>
              <Typography variant="body2" color="text.secondary">
                Validations Zod, React Hook Form, pré-remplissage.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => reset(defaultValues)}>
                Réinitialiser
              </Button>
              <Button variant="contained" onClick={handleSubmit(onSubmit, onError)} disabled={isSubmitting}>
                Valider
              </Button>
            </Stack>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Nom complet" fullWidth required error={!!errors.fullName} helperText={errors.fullName?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Email" type="email" fullWidth required error={!!errors.email} helperText={errors.email?.message} />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Budget"
                    type="number"
                    fullWidth
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start">€</InputAdornment> }}
                    error={!!errors.budget}
                    helperText={errors.budget?.message || 'Min. 1 000 €'}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Priorité (1-10)
                    </Typography>
                    <Slider
                      {...field}
                      value={field.value}
                      min={1}
                      max={10}
                      step={1}
                      valueLabelDisplay="on"
                      onChange={(_, value) => field.onChange(value as number)}
                    />
                    {errors.priority && (
                      <Typography color="error" variant="caption">
                        {errors.priority.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="segment"
                control={control}
                render={({ field }) => (
                  <TextField select label="Segment" fullWidth required {...field} error={!!errors.segment} helperText={errors.segment?.message}>
                    {segments.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={tagOptions}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        required
                        error={!!errors.tags}
                        helperText={errors.tags?.message || 'Choisissez au moins un tag'}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="meeting"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date de rendez-vous"
                    slotProps={{ textField: { fullWidth: true } }}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <FormControlLabel control={<Switch {...field} checked={field.value} />} label="Actif" />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};
