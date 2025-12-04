import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface KanbanCard {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: 'todo' | 'doing' | 'done';
  title: string;
  color: 'default' | 'primary' | 'success';
  items: KanbanCard[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'default',
    items: [
      { id: '1', title: 'Squelette UI', description: 'Préparer les composants' },
      { id: '2', title: 'Benchmarks', description: 'Comparer 3 approches' }
    ]
  },
  {
    id: 'doing',
    title: 'In Progress',
    color: 'primary',
    items: [
      { id: '3', title: 'Prototype data', description: 'Mock API & DataGrid' },
      { id: '4', title: 'Accessibilité', description: 'Aria labels' }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'success',
    items: [{ id: '5', title: 'Setup Vite', description: 'TS + Eslint' }]
  }
];

export const KanbanPage = () => {
  const [columns, setColumns] = useLocalStorage<Column[]>('maquette-kanban', initialColumns);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = columns.findIndex((c) => c.id === source.droppableId);
    const destColIndex = columns.findIndex((c) => c.id === destination.droppableId);
    if (sourceColIndex === -1 || destColIndex === -1) return;

    const sourceItems = Array.from(columns[sourceColIndex].items);
    const [moved] = sourceItems.splice(source.index, 1);

    const destItems = Array.from(columns[destColIndex].items);
    destItems.splice(destination.index, 0, moved);

    const updated = columns.map((col, idx) => {
      if (idx === sourceColIndex) return { ...col, items: sourceItems };
      if (idx === destColIndex) return { ...col, items: destItems };
      return col;
    });
    setColumns(updated);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Kanban drag & drop
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Persistance locale (localStorage) + react-beautiful-dnd.
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {columns.map((column) => (
            <Grid item xs={12} md={4} key={column.id}>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={column.title} color={column.color} />
                  <Typography variant="caption" color="text.secondary">
                    {column.items.length} cartes
                  </Typography>
                </Stack>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ minHeight: 280, backgroundColor: 'action.hover', borderRadius: 2, p: 1 }}
                    >
                      {column.items.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(dragProvided, snapshot) => (
                            <Card
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              sx={{
                                mb: 1.5,
                                borderRadius: 3,
                                boxShadow: snapshot.isDragging ? 10 : 2,
                                transition: 'box-shadow 0.2s ease'
                              }}
                            >
                              <CardContent>
                                <Typography variant="subtitle1">{card.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {card.description}
                                </Typography>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};
