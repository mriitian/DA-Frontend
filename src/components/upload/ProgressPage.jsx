import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, CircularProgress, Box, Typography, Icon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProgressPage = () => {
  const uploads = useSelector((state) => state.upload.uploads);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Upload Progress
      </Typography>
      <List>
        {uploads.map((upload) => (
          <ListItem key={upload.id} divider>
            <ListItemText
              primary={upload.name}
              secondary={
                <Box display="flex" alignItems="center">
                  {upload.progress === 100 ? (
                    <CheckCircleIcon sx={{ color: 'green', marginRight: 1 }} />
                  ) : (
                    <CircularProgress
                      variant="determinate"
                      value={upload.progress}
                      size={24}
                      sx={{ marginRight: 1 }}
                    />
                  )}
                  <Typography variant="body2">Progress: {upload.progress}%</Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProgressPage;
